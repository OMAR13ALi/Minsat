package com.minsat.subscriber;

import com.minsat.config.UcipProperties;
import com.minsat.logs.AuditService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

/**
 * Proxies update operations from the frontend (:5000) to the ucip-wrapper (:8080).
 * All MSISDs are bare 8-digit — this controller prepends "216" before forwarding.
 */
@RestController
@RequestMapping("/api/update")
public class UpdateController {

    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final AuditService audit;

    public UpdateController(RestTemplate restTemplate, UcipProperties props, AuditService audit) {
        this.restTemplate = restTemplate;
        this.baseUrl = props.getBaseUrl();
        this.audit = audit;
    }

    /** Block or unblock a subscriber. body: { msisdn, blocked: true/false } */
    @PostMapping("/block")
    @PreAuthorize("hasAnyRole('DSC','IN','ADMIN')")
    public ResponseEntity<Map> block(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Object blocked = body.get("blocked");
        ResponseEntity<Map> result = forward("/acip/update-blocked", Map.of(
                "subscriberNumber", "216" + msisdn,
                "blocked", blocked != null ? blocked : false
        ));
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_BLOCK", msisdn,
                audit.toJson(Map.of("blocked", String.valueOf(blocked))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Change service class. body: { msisdn, action, serviceClassNew } */
    @PostMapping("/service-class")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> serviceClass(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("action", body.getOrDefault("action", "SetOriginal"));
        if (body.containsKey("serviceClassNew")) payload.put("serviceClassNew", body.get("serviceClassNew"));
        ResponseEntity<Map> result = forward("/ucip/update-service-class", payload);
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_SERVICE_CLASS", msisdn,
                audit.toJson(Map.of("action", String.valueOf(body.getOrDefault("action", "SetOriginal")),
                                    "serviceClassNew", String.valueOf(body.getOrDefault("serviceClassNew", "")))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Refill via voucher code OR amount+currency. body: { msisdn, voucherCode } or { msisdn, amount, currency } */
    @PostMapping("/refill")
    @PreAuthorize("hasAnyRole('DFI','IN','ADMIN')")
    public ResponseEntity<Map> refill(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        if (body.containsKey("voucherCode")) payload.put("voucherCode", body.get("voucherCode"));
        if (body.containsKey("amount")) {
            payload.put("amount", body.get("amount"));
            payload.put("currency", body.getOrDefault("currency", "TND"));
        }
        ResponseEntity<Map> result = forward("/ucip/refill", payload);
        Map<String, Object> details = new HashMap<>();
        if (body.containsKey("voucherCode")) details.put("voucherCode", String.valueOf(body.get("voucherCode")));
        if (body.containsKey("amount")) {
            details.put("amount", String.valueOf(body.get("amount")));
            details.put("currency", String.valueOf(body.getOrDefault("currency", "TND")));
        }
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_REFILL", msisdn,
                audit.toJson(details), audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Add or remove FAF entries. body: { msisdn, action: 'ADD'/'DELETE', entries: [{fafNumber, owner}] } */
    @PostMapping("/faf")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> faf(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("action", body.getOrDefault("action", "ADD"));
        payload.put("entries", body.getOrDefault("entries", List.of()));
        ResponseEntity<Map> result = forward("/ucip/update-faf-list", payload);
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_FAF", msisdn,
                audit.toJson(Map.of("action", String.valueOf(body.getOrDefault("action", "ADD")))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Adjust balance or dates. body: { msisdn, adjustmentAmount, currency, supervisionExpiryDate } */
    @PostMapping("/balance")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map> balance(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        if (body.containsKey("adjustmentAmount")) payload.put("adjustmentAmount", body.get("adjustmentAmount"));
        if (body.containsKey("currency"))          payload.put("currency", body.get("currency"));
        if (body.containsKey("supervisionExpiryDate")) payload.put("supervisionExpiryDate", body.get("supervisionExpiryDate"));
        if (body.containsKey("dedicatedAccounts")) payload.put("dedicatedAccounts", body.get("dedicatedAccounts"));
        ResponseEntity<Map> result = forward("/ucip/update-balance", payload);
        Map<String, Object> details = new HashMap<>();
        if (body.containsKey("adjustmentAmount")) details.put("adjustmentAmount", String.valueOf(body.get("adjustmentAmount")));
        if (body.containsKey("currency"))          details.put("currency", String.valueOf(body.get("currency")));
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_BALANCE", msisdn,
                audit.toJson(details), audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Update USSD end-of-call notification. body: { msisdn, ussdEndOfCallNotificationId } */
    @PostMapping("/account-details")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> accountDetails(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        ResponseEntity<Map> result = forward("/ucip/update-account-details", Map.of(
                "subscriberNumber", "216" + msisdn,
                "ussdEndOfCallNotificationId", body.getOrDefault("ussdEndOfCallNotificationId", 0)
        ));
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_ACCOUNT_DETAILS", msisdn,
                audit.toJson(Map.of("ussdEndOfCallNotificationId",
                        String.valueOf(body.getOrDefault("ussdEndOfCallNotificationId", 0)))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Update community list. body: { msisdn, communityIds: [int, ...] } */
    @PostMapping("/community-list")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> communityList(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("communityIds", body.getOrDefault("communityIds", List.of()));
        ResponseEntity<Map> result = forward("/ucip/update-community", payload);
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_COMMUNITY", msisdn,
                audit.toJson(Map.of("communityIds",
                        body.getOrDefault("communityIds", List.of()).toString())),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Update subscriber segmentation. body: { msisdn, accountGroupId } */
    @PostMapping("/subscriber-segmentation")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> subscriberSegmentation(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        ResponseEntity<Map> result = forward("/ucip/update-segmentation", Map.of(
                "subscriberNumber", "216" + msisdn,
                "accountGroupId", body.getOrDefault("accountGroupId", 0)
        ));
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_SEGMENTATION", msisdn,
                audit.toJson(Map.of("accountGroupId",
                        String.valueOf(body.getOrDefault("accountGroupId", 0)))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Install a new subscriber. body: { msisdn, serviceClassNew, temporaryBlockedFlag, languageId, ussdEocnId } */
    @PostMapping("/install")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> install(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("serviceClassNew", body.getOrDefault("serviceClassNew", 0));
        payload.put("temporaryBlockedFlag", body.getOrDefault("temporaryBlockedFlag", false));
        payload.put("languageId", body.getOrDefault("languageId", 0));
        payload.put("ussdEocnId", body.getOrDefault("ussdEocnId", 0));
        ResponseEntity<Map> result = forward("/acip/install", payload);
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_INSTALL", msisdn,
                audit.toJson(Map.of("serviceClassNew", String.valueOf(body.getOrDefault("serviceClassNew", 0)))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Delete a subscriber. body: { msisdn, originOperatorId } */
    @PostMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map> delete(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        ResponseEntity<Map> result = forward("/acip/delete", Map.of(
                "subscriberNumber", "216" + msisdn,
                "originOperatorId", body.getOrDefault("originOperatorId", "")
        ));
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_DELETE", msisdn,
                audit.toJson(Map.of("originOperatorId",
                        String.valueOf(body.getOrDefault("originOperatorId", "")))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Link a subordinate subscriber. body: { msisdn, masterAccountNumber } */
    @PostMapping("/link-subordinate")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> linkSubordinate(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        ResponseEntity<Map> result = forward("/acip/link-subordinate", Map.of(
                "subscriberNumber", "216" + msisdn,
                "masterAccountNumber", body.getOrDefault("masterAccountNumber", "")
        ));
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_LINK_SUBORDINATE", msisdn,
                audit.toJson(Map.of("masterAccountNumber",
                        String.valueOf(body.getOrDefault("masterAccountNumber", "")))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Update refill barring. body: { msisdn, action: BAR|CLEAR|STEP } */
    @PostMapping("/refill-barring")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> refillBarring(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        ResponseEntity<Map> result = forward("/acip/update-refill-barring", Map.of(
                "subscriberNumber", "216" + msisdn,
                "action", body.getOrDefault("action", "BAR")
        ));
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_REFILL_BARRING", msisdn,
                audit.toJson(Map.of("action", String.valueOf(body.getOrDefault("action", "BAR")))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Update promotion counters. body: { msisdn, transactionCurrency, promotionRefillAmountRelative } */
    @PostMapping("/promotion-counters")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> promotionCounters(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("transactionCurrency", body.getOrDefault("transactionCurrency", "TND"));
        if (body.containsKey("promotionRefillAmountRelative"))
            payload.put("promotionRefillAmountRelative", body.get("promotionRefillAmountRelative"));
        ResponseEntity<Map> result = forward("/acip/update-promotion-counters", payload);
        Map<String, Object> pcDetails = new HashMap<>();
        pcDetails.put("transactionCurrency", String.valueOf(body.getOrDefault("transactionCurrency", "TND")));
        if (body.containsKey("promotionRefillAmountRelative"))
            pcDetails.put("promotionRefillAmountRelative", String.valueOf(body.get("promotionRefillAmountRelative")));
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_PROMOTION_COUNTERS", msisdn,
                audit.toJson(pcDetails), audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Update promotion plan. body: { msisdn, action, planId, oldStartDate, oldEndDate, startDate, endDate } */
    @PostMapping("/promotion-plan")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> promotionPlan(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("action", body.getOrDefault("action", "ADD"));
        if (body.containsKey("planId"))        payload.put("planId", body.get("planId"));
        if (body.containsKey("oldStartDate"))  payload.put("oldStartDate", body.get("oldStartDate"));
        if (body.containsKey("oldEndDate"))    payload.put("oldEndDate", body.get("oldEndDate"));
        if (body.containsKey("startDate"))     payload.put("startDate", body.get("startDate"));
        if (body.containsKey("endDate"))       payload.put("endDate", body.get("endDate"));
        ResponseEntity<Map> result = forward("/acip/update-promotion-plan", payload);
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_PROMOTION_PLAN", msisdn,
                audit.toJson(Map.of("action", String.valueOf(body.getOrDefault("action", "ADD")))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    /** Update accumulators. body: { msisdn, accumulators: [{accumulatorId, relativeValue, absoluteValue, startDate}] } */
    @PostMapping("/accumulators")
    @PreAuthorize("hasAnyRole('IN','ADMIN')")
    public ResponseEntity<Map> accumulators(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("accumulators", body.getOrDefault("accumulators", List.of()));
        ResponseEntity<Map> result = forward("/acip/update-accumulators", payload);
        Object accRaw = body.getOrDefault("accumulators", List.of());
        int accCount = accRaw instanceof List<?> l ? l.size() : 0;
        audit.log(audit.currentUser(), audit.currentRole(), "UPDATE_ACCUMULATORS", msisdn,
                audit.toJson(Map.of("accumulatorCount", String.valueOf(accCount))),
                audit.extractIp(request), responseStatus(result), airCode(result));
        return result;
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    @SuppressWarnings("unchecked")
    private ResponseEntity<Map> forward(String path, Object payload) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> entity = new HttpEntity<>(payload, headers);
        try {
            ResponseEntity<Map> resp = restTemplate.exchange(
                    baseUrl + path, HttpMethod.POST, entity, Map.class);
            return ResponseEntity.status(resp.getStatusCode()).body(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("success", false, "responseMessage", e.getMessage()));
        }
    }

    private String require(Map<String, Object> body, String key) {
        Object val = body.get(key);
        if (val == null || val.toString().isBlank()) {
            throw new IllegalArgumentException(key + " is required");
        }
        return val.toString().trim();
    }

    @SuppressWarnings("unchecked")
    private String responseStatus(ResponseEntity<Map> resp) {
        if (resp.getStatusCode().isError()) return "FAILURE";
        Map<String, Object> body = resp.getBody();
        if (body == null) return "SUCCESS";
        Object success = body.get("success");
        return Boolean.FALSE.equals(success) ? "FAILURE" : "SUCCESS";
    }

    @SuppressWarnings("unchecked")
    private String airCode(ResponseEntity<Map> resp) {
        if (resp.getBody() == null) return null;
        Object code = resp.getBody().get("responseCode");
        return code != null ? String.valueOf(code) : null;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Map.of("success", false, "responseMessage", e.getMessage()));
    }
}
