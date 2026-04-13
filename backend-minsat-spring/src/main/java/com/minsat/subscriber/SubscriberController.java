package com.minsat.subscriber;

import com.minsat.hlr.HlrService;
import com.minsat.logs.AuditService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@PreAuthorize("hasAnyRole('DFI','DSC','IN','ADMIN')")
public class SubscriberController {

    private final SubscriberService subscriberService;
    private final HlrService hlrService;
    private final AuditService audit;

    public SubscriberController(SubscriberService subscriberService,
                                HlrService hlrService,
                                AuditService audit) {
        this.subscriberService = subscriberService;
        this.hlrService = hlrService;
        this.audit = audit;
    }

    @GetMapping("/msisdn/{msisdn}")
    public ResponseEntity<Map<String, Object>> getMsisdnInformation(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getMsisdnInformation(msisdn);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "MSISDN_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        // Aggregated result has no top-level responseCode — extract from sub-maps
        Map<String, Object> details = new LinkedHashMap<>();
        Object ad = result.get("accountDetails");
        if (ad instanceof Map<?, ?> adMap) {
            Object sc = adMap.get("serviceClassCurrent");
            Object bl = adMap.get("temporaryBlockedFlag");
            details.put("serviceClass", sc != null ? String.valueOf(sc) : "N/A");
            details.put("blocked",      bl != null ? String.valueOf(bl) : "N/A");
        }
        Object bal = result.get("balance");
        if (bal instanceof Map<?, ?> balMap) {
            Object bv = balMap.get("balance");
            details.put("balance", bv != null ? String.valueOf(bv) : "N/A");
        }
        audit.log(audit.currentUser(), audit.currentRole(), "MSISDN_QUERY", msisdn,
                audit.toJson(details), audit.extractIp(request), "SUCCESS", null);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/account-details/{msisdn}")
    public ResponseEntity<Map<String, Object>> getAccountDetails(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getAccountDetails(msisdn);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "ACCOUNT_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        Map<String, Object> data = dataOf(result);
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("serviceClass", String.valueOf(data.getOrDefault("serviceClassCurrent",  "N/A")));
        details.put("blocked",      String.valueOf(data.getOrDefault("temporaryBlockedFlag", "N/A")));
        audit.log(audit.currentUser(), audit.currentRole(), "ACCOUNT_QUERY", msisdn,
                audit.toJson(details), audit.extractIp(request), queryStatus(result), queryAirCode(result));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/balance-and-date/{msisdn}")
    public ResponseEntity<Map<String, Object>> getBalanceAndDate(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getBalanceAndDate(msisdn);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "BALANCE_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        Map<String, Object> data = dataOf(result);
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("balance",  String.valueOf(data.getOrDefault("accountValue1", "N/A")));
        details.put("currency", String.valueOf(data.getOrDefault("currency1",     "TND")));
        audit.log(audit.currentUser(), audit.currentRole(), "BALANCE_QUERY", msisdn,
                audit.toJson(details), audit.extractIp(request), queryStatus(result), queryAirCode(result));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/faf-list/{msisdn}")
    public ResponseEntity<Map<String, Object>> getFaFList(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getFaFList(msisdn);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "FAF_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        Object fafList = dataOf(result).get("fafInformationList");
        int fafCount = fafList instanceof List<?> l ? l.size() : 0;
        audit.log(audit.currentUser(), audit.currentRole(), "FAF_QUERY", msisdn,
                audit.toJson(Map.of("fafCount", String.valueOf(fafCount))),
                audit.extractIp(request), queryStatus(result), queryAirCode(result));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/accumulators/{msisdn}")
    public ResponseEntity<Map<String, Object>> getAccumulators(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getAccumulators(msisdn);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "ACCUMULATOR_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        Object accumList = dataOf(result).get("accumulatorInformation");
        int accumCount = accumList instanceof List<?> l ? l.size() : 0;
        audit.log(audit.currentUser(), audit.currentRole(), "ACCUMULATOR_QUERY", msisdn,
                audit.toJson(Map.of("accumulatorCount", String.valueOf(accumCount))),
                audit.extractIp(request), queryStatus(result), queryAirCode(result));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/hlr/{msisdn}")
    public ResponseEntity<Map<String, Object>> getHlrStatus(
            @PathVariable String msisdn, HttpServletRequest request) {
        // HlrService catches all exceptions internally — failure returns map with "error" key
        Map<String, Object> result = hlrService.getHlrStatus(msisdn);
        boolean failed = result.containsKey("error");
        Map<String, Object> details = new LinkedHashMap<>();
        if (failed) {
            details.put("error", String.valueOf(result.get("error")));
        } else {
            details.put("barred", String.valueOf(result.getOrDefault("barred", "N/A")));
            details.put("odbic",  String.valueOf(result.getOrDefault("odbic",  "N/A")));
        }
        audit.log(audit.currentUser(), audit.currentRole(), "HLR_QUERY", msisdn,
                audit.toJson(details), audit.extractIp(request),
                failed ? "FAILURE" : "SUCCESS", null);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/promotion-counters/{msisdn}")
    public ResponseEntity<Map<String, Object>> getPromotionCounters(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getPromotionCounters(msisdn);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "PROMOTION_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        audit.log(audit.currentUser(), audit.currentRole(), "PROMOTION_QUERY", msisdn,
                null, audit.extractIp(request), queryStatus(result), queryAirCode(result));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/promotion-plans/{msisdn}")
    public ResponseEntity<Map<String, Object>> getPromotionPlans(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getPromotionPlans(msisdn);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "PROMOTION_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        audit.log(audit.currentUser(), audit.currentRole(), "PROMOTION_QUERY", msisdn,
                null, audit.extractIp(request), queryStatus(result), queryAirCode(result));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/allowed-service-classes/{msisdn}")
    public ResponseEntity<Map<String, Object>> getAllowedServiceClasses(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getAllowedServiceClasses(msisdn);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "SC_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        Object scList = dataOf(result).get("allowedServiceClassesList");
        int scCount = scList instanceof List<?> l ? l.size() : 0;
        audit.log(audit.currentUser(), audit.currentRole(), "SC_QUERY", msisdn,
                audit.toJson(Map.of("scCount", String.valueOf(scCount))),
                audit.extractIp(request), queryStatus(result), queryAirCode(result));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/refill-options/{msisdn}")
    public ResponseEntity<Map<String, Object>> getRefillOptions(
            @PathVariable String msisdn, HttpServletRequest request) {
        Map<String, Object> result;
        try {
            result = subscriberService.getRefillOptions(msisdn, null);
        } catch (Exception e) {
            audit.log(audit.currentUser(), audit.currentRole(), "REFILL_OPTIONS_QUERY", msisdn,
                    null, audit.extractIp(request), "FAILURE");
            throw e;
        }
        audit.log(audit.currentUser(), audit.currentRole(), "REFILL_OPTIONS_QUERY", msisdn,
                null, audit.extractIp(request), queryStatus(result), queryAirCode(result));
        return ResponseEntity.ok(result);
    }

    // ── helpers ──────────────────────────────────────────────────────────────────

    /** Returns "FAILURE" if the response map signals an AIR error, otherwise "SUCCESS". */
    private String queryStatus(Map<String, Object> result) {
        if (Boolean.FALSE.equals(result.get("success"))) return "FAILURE";
        Object code = result.get("responseCode");
        if (code instanceof Number n && n.intValue() != 0) return "FAILURE";
        return "SUCCESS";
    }

    /** Extracts the AIR response code from the result map, or null if absent. */
    private String queryAirCode(Map<String, Object> result) {
        Object code = result.get("responseCode");
        return code != null ? String.valueOf(code) : null;
    }

    /** Extracts the nested "data" map from an AirResponse-shaped result map. */
    @SuppressWarnings("unchecked")
    private Map<String, Object> dataOf(Map<String, Object> result) {
        Object d = result.get("data");
        return d instanceof Map ? (Map<String, Object>) d : Map.of();
    }
}
