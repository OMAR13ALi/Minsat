package com.minsat.subscriber;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SubscriberService {

    private static final Logger log = LoggerFactory.getLogger(SubscriberService.class);
    private static final Pattern AIR_DATE = Pattern.compile(
            "^(\\d{4})(\\d{2})(\\d{2})T(\\d{2}):?(\\d{2}):?(\\d{2})([+\\-]\\d{4})?$");

    private final UcipClient ucipClient;
    private final JdbcTemplate jdbc;

    public SubscriberService(UcipClient ucipClient, JdbcTemplate jdbc) {
        this.ucipClient = ucipClient;
        this.jdbc = jdbc;
    }

    // ---- individual endpoints ----

    public Map<String, Object> getBalanceAndDate(String msisdn) {
        return ucipClient.getBalanceAndDate(msisdn);
    }

    public Map<String, Object> getAccountDetails(String msisdn) {
        return ucipClient.getAccountDetails(msisdn);
    }

    public Map<String, Object> getFaFList(String msisdn) {
        Map<String, Object> response = ucipClient.getFaFList(msisdn);
        enrichFafDescriptions(response);
        return response;
    }

    public Map<String, Object> getAccumulators(String msisdn) {
        Map<String, Object> response = ucipClient.getAccumulators(msisdn);
        enrichAccumulatorDescriptions(response);
        return response;
    }

    public Map<String, Object> getPromotionCounters(String msisdn) {
        return ucipClient.getPromotionCounters(msisdn);
    }

    public Map<String, Object> getPromotionPlans(String msisdn) {
        return ucipClient.getPromotionPlans(msisdn);
    }

    public Map<String, Object> getAllowedServiceClasses(String msisdn) {
        return ucipClient.getAllowedServiceClasses(msisdn);
    }

    public Map<String, Object> getRefillOptions(String msisdn, Integer serviceClassCurrent) {
        return ucipClient.getRefillOptions(msisdn, serviceClassCurrent);
    }

    // ---- aggregated endpoint ----

    @SuppressWarnings("unchecked")
    public Map<String, Object> getMsisdnInformation(String msisdn) {
        log.debug("getMsisdnInformation for {}", msisdn);

        // 1. accountDetails first (we need serviceClassCurrent for DA enrichment)
        Map<String, Object> accountDetailsResp = ucipClient.getAccountDetails(msisdn);
        Map<String, Object> adData = dataOf(accountDetailsResp);

        // 2. parallel calls
        CompletableFuture<Map<String, Object>> balFuture =
                CompletableFuture.supplyAsync(() -> ucipClient.getBalanceAndDate(msisdn));
        CompletableFuture<Map<String, Object>> fafFuture =
                CompletableFuture.supplyAsync(() -> ucipClient.getFaFList(msisdn));
        CompletableFuture<Map<String, Object>> accumFuture =
                CompletableFuture.supplyAsync(() -> ucipClient.getAccumulators(msisdn));
        CompletableFuture<Map<String, Object>> promCountFuture =
                CompletableFuture.supplyAsync(() -> { try { return ucipClient.getPromotionCounters(msisdn); } catch (Exception e) { log.warn("PromotionCounters failed: {}", e.getMessage()); return Map.of(); } });
        CompletableFuture<Map<String, Object>> promPlansFuture =
                CompletableFuture.supplyAsync(() -> { try { return ucipClient.getPromotionPlans(msisdn); } catch (Exception e) { log.warn("PromotionPlans failed: {}", e.getMessage()); return Map.of(); } });

        CompletableFuture.allOf(balFuture, fafFuture, accumFuture, promCountFuture, promPlansFuture).join();

        Map<String, Object> balResp   = balFuture.join();
        Map<String, Object> fafResp   = fafFuture.join();
        Map<String, Object> accumResp = accumFuture.join();
        Map<String, Object> promCountResp = promCountFuture.join();
        Map<String, Object> promPlansResp = promPlansFuture.join();

        Map<String, Object> balData   = dataOf(balResp);
        Map<String, Object> fafData   = dataOf(fafResp);
        Map<String, Object> accumData = dataOf(accumResp);

        // 3. DB enrichment: DA descriptions based on serviceClassCurrent
        Map<Integer, String> daDescriptions = new HashMap<>();
        Object scObj = adData.get("serviceClassCurrent");
        if (scObj instanceof Number sc) {
            try {
                List<Map<String, Object>> rows = jdbc.queryForList(
                        "SELECT b.DEDICATED_ACCOUNT_ID as da, b.DESCRIPTION as description " +
                        "FROM serviceclasses a, dagroups b " +
                        "WHERE a.sc = ? AND a.dagroup = b.DEFINITION_GROUP_ID",
                        sc.intValue());
                for (Map<String, Object> row : rows) {
                    Object daId = row.get("da");
                    Object desc = row.get("description");
                    if (daId instanceof Number n) {
                        daDescriptions.put(n.intValue(), desc != null ? desc.toString() : "");
                    }
                }
            } catch (Exception e) {
                log.warn("DA description lookup failed: {}", e.getMessage());
            }
        }

        // 4. Format balance section
        Map<String, Object> transformedBalance = formatBalance(balData, daDescriptions);

        // 5. Enrich FaF descriptions
        List<Map<String, Object>> fafList = extractList(fafData, "fafInformationList");
        fafList = enrichFaf(fafList);

        // 6. Enrich accumulator descriptions
        List<Map<String, Object>> accumList = extractList(accumData, "accumulatorInformation");
        accumList = enrichAccumulators(accumList);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("accountDetails", adData);
        result.put("balance", transformedBalance);
        result.put("faFList", fafList);
        result.put("accumulators", accumList);
        result.put("promotionCounters", promCountResp);
        result.put("promotionPlans", promPlansResp);
        return result;
    }

    // ---- helpers ----

    @SuppressWarnings("unchecked")
    private Map<String, Object> dataOf(Map<String, Object> response) {
        if (response == null) return new HashMap<>();
        Object data = response.get("data");
        return data instanceof Map ? (Map<String, Object>) data : new HashMap<>();
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> extractList(Map<String, Object> data, String key) {
        Object val = data.get(key);
        if (val instanceof List) return (List<Map<String, Object>>) val;
        if (val instanceof Map) {
            // wrapped in a single-item map or similar — wrap in list
            return List.of((Map<String, Object>) val);
        }
        return new ArrayList<>();
    }

    private List<Map<String, Object>> enrichFaf(List<Map<String, Object>> fafList) {
        // load all faf descriptions in one query
        Map<Integer, String> fafDesc = new HashMap<>();
        try {
            jdbc.query("SELECT fafindicator, description FROM faf",
                    rs -> {
                        fafDesc.put(rs.getInt("fafindicator"), rs.getString("description"));
                    });
        } catch (Exception e) {
            log.warn("FaF description lookup failed: {}", e.getMessage());
        }

        List<Map<String, Object>> enriched = new ArrayList<>();
        for (Map<String, Object> entry : fafList) {
            Map<String, Object> m = new LinkedHashMap<>(entry);
            Object ind = m.get("fafIndicator");
            if (ind instanceof Number n) {
                m.put("description", fafDesc.getOrDefault(n.intValue(), "N/A"));
            }
            enriched.add(m);
        }
        return enriched;
    }

    private List<Map<String, Object>> enrichAccumulators(List<Map<String, Object>> accumList) {
        Map<Integer, String> uaDesc = new HashMap<>();
        try {
            jdbc.query("SELECT ua, description FROM uagroup",
                    rs -> {
                        uaDesc.put(rs.getInt("ua"), rs.getString("description"));
                    });
        } catch (Exception e) {
            log.warn("UA description lookup failed: {}", e.getMessage());
        }

        List<Map<String, Object>> enriched = new ArrayList<>();
        for (Map<String, Object> entry : accumList) {
            Map<String, Object> m = new LinkedHashMap<>(entry);
            Object id = m.get("accumulatorID");
            if (id instanceof Number n) {
                m.put("description", uaDesc.getOrDefault(n.intValue(), "N/A"));
            }
            enriched.add(m);
        }
        return enriched;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> formatBalance(Map<String, Object> balData,
                                              Map<Integer, String> daDescriptions) {
        Map<String, Object> b = new LinkedHashMap<>();
        b.put("balance", formatMillimes(balData.get("accountValue1")));
        b.put("currency", Objects.toString(balData.get("currency1"), "TND"));
        b.put("creditClearanceDate", formatAirDate(balData.get("creditClearanceDate")));
        b.put("supervisionExpiryDate", formatAirDate(balData.get("supervisionExpiryDate")));
        b.put("serviceRemovalDate", formatAirDate(balData.get("serviceRemovalDate")));

        // dedicated accounts
        Object daRaw = balData.get("dedicatedAccountInformation");
        List<Object> daValues = new ArrayList<>();
        if (daRaw instanceof List list) {
            daValues = list;
        } else if (daRaw instanceof Map m) {
            Object nested = ((Map<?, ?>) m).get("value");
            if (nested instanceof List list) daValues = list;
            else if (nested != null) daValues = List.of(nested);
        }

        List<Map<String, Object>> das = new ArrayList<>();
        for (Object entry : daValues) {
            if (entry instanceof Map<?, ?> em) {
                Map<String, Object> da = new LinkedHashMap<>();
                Object daId = em.get("dedicatedAccountID");
                Object daVal = em.get("dedicatedAccountValue1");
                Object exp   = em.get("expiryDate");
                int id = daId instanceof Number n ? n.intValue() : 0;
                da.put("id", id);
                da.put("value", formatMillimes(daVal));
                da.put("expiryDate", formatAirDate(exp));
                da.put("description", daDescriptions.getOrDefault(id, "N/A"));
                das.add(da);
            }
        }
        b.put("dedicatedAccounts", das);
        return b;
    }

    private String formatMillimes(Object raw) {
        if (raw == null) return "N/A";
        try {
            long val = Long.parseLong(raw.toString().trim());
            return String.format("%.3f DT", val / 1000.0);
        } catch (NumberFormatException e) {
            return "N/A";
        }
    }

    private String formatAirDate(Object raw) {
        if (raw == null) return "N/A";
        String s = raw.toString().trim();
        if (s.isEmpty() || s.equals("00000000T000000")) return "N/A";
        Matcher m = AIR_DATE.matcher(s);
        if (m.matches()) {
            String tz = m.group(7) != null ? m.group(7).substring(0, 3) + ":" + m.group(7).substring(3) : "Z";
            return m.group(3) + "/" + m.group(2) + "/" + m.group(1)
                    + " " + m.group(4) + ":" + m.group(5) + ":" + m.group(6)
                    + " " + tz;
        }
        return s;
    }

    private void enrichFafDescriptions(Map<String, Object> response) {
        Map<String, Object> data = dataOf(response);
        List<Map<String, Object>> list = extractList(data, "fafInformationList");
        // replace in-place — the response map contains data which we can update
        data.put("fafInformationList", enrichFaf(list));
    }

    private void enrichAccumulatorDescriptions(Map<String, Object> response) {
        Map<String, Object> data = dataOf(response);
        List<Map<String, Object>> list = extractList(data, "accumulatorInformation");
        data.put("accumulatorInformation", enrichAccumulators(list));
    }
}
