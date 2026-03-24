package com.minsat.subscriber;

import com.minsat.config.UcipProperties;
import org.springframework.http.*;
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

    public UpdateController(RestTemplate restTemplate, UcipProperties props) {
        this.restTemplate = restTemplate;
        this.baseUrl = props.getBaseUrl();
    }

    /** Block or unblock a subscriber. body: { msisdn, blocked: true/false } */
    @PostMapping("/block")
    public ResponseEntity<Map> block(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Object blocked = body.get("blocked");
        return forward("/acip/update-blocked", Map.of(
                "subscriberNumber", "216" + msisdn,
                "blocked", blocked != null ? blocked : false
        ));
    }

    /** Change service class. body: { msisdn, action, serviceClassNew } */
    @PostMapping("/service-class")
    public ResponseEntity<Map> serviceClass(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("action", body.getOrDefault("action", "CHANGE"));
        if (body.containsKey("serviceClassNew")) {
            payload.put("serviceClassNew", body.get("serviceClassNew"));
        }
        return forward("/ucip/update-service-class", payload);
    }

    /** Refill via voucher code OR amount+currency. body: { msisdn, voucherCode } or { msisdn, amount, currency } */
    @PostMapping("/refill")
    public ResponseEntity<Map> refill(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        if (body.containsKey("voucherCode")) {
            payload.put("voucherCode", body.get("voucherCode"));
        }
        if (body.containsKey("amount")) {
            payload.put("amount", body.get("amount"));
            payload.put("currency", body.getOrDefault("currency", "TND"));
        }
        return forward("/ucip/refill", payload);
    }

    /** Add or remove FAF entries. body: { msisdn, action: 'ADD'/'DELETE', entries: [{fafNumber, owner}] } */
    @PostMapping("/faf")
    public ResponseEntity<Map> faf(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("action", body.getOrDefault("action", "ADD"));
        payload.put("entries", body.getOrDefault("entries", List.of()));
        return forward("/ucip/update-faf-list", payload);
    }

    /** Adjust balance or dates. body: { msisdn, adjustmentAmount, currency, supervisionExpiryDate } */
    @PostMapping("/balance")
    public ResponseEntity<Map> balance(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        if (body.containsKey("adjustmentAmount")) payload.put("adjustmentAmount", body.get("adjustmentAmount"));
        if (body.containsKey("currency"))          payload.put("currency", body.get("currency"));
        if (body.containsKey("supervisionExpiryDate")) payload.put("supervisionExpiryDate", body.get("supervisionExpiryDate"));
        if (body.containsKey("dedicatedAccounts")) payload.put("dedicatedAccounts", body.get("dedicatedAccounts"));
        return forward("/ucip/update-balance", payload);
    }

    /** Update USSD end-of-call notification. body: { msisdn, ussdEndOfCallNotificationId } */
    @PostMapping("/account-details")
    public ResponseEntity<Map> accountDetails(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        return forward("/ucip/update-account-details", Map.of(
                "subscriberNumber", "216" + msisdn,
                "ussdEndOfCallNotificationId", body.getOrDefault("ussdEndOfCallNotificationId", 0)
        ));
    }

    /** Update community list. body: { msisdn, communityIds: [int, ...] } */
    @PostMapping("/community-list")
    public ResponseEntity<Map> communityList(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("communityIds", body.getOrDefault("communityIds", List.of()));
        return forward("/ucip/update-community-list", payload);
    }

    /** Update subscriber segmentation. body: { msisdn, accountGroupId } */
    @PostMapping("/subscriber-segmentation")
    public ResponseEntity<Map> subscriberSegmentation(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        return forward("/ucip/update-subscriber-segmentation", Map.of(
                "subscriberNumber", "216" + msisdn,
                "accountGroupId", body.getOrDefault("accountGroupId", 0)
        ));
    }

    /** Install a new subscriber. body: { msisdn, serviceClassNew, temporaryBlockedFlag, languageId, ussdEocnId } */
    @PostMapping("/install")
    public ResponseEntity<Map> install(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("serviceClassNew", body.getOrDefault("serviceClassNew", 0));
        payload.put("temporaryBlockedFlag", body.getOrDefault("temporaryBlockedFlag", false));
        payload.put("languageId", body.getOrDefault("languageId", 0));
        payload.put("ussdEocnId", body.getOrDefault("ussdEocnId", 0));
        return forward("/acip/install", payload);
    }

    /** Delete a subscriber. body: { msisdn, originOperatorId } */
    @PostMapping("/delete")
    public ResponseEntity<Map> delete(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        return forward("/acip/delete", Map.of(
                "subscriberNumber", "216" + msisdn,
                "originOperatorId", body.getOrDefault("originOperatorId", "")
        ));
    }

    /** Link a subordinate subscriber. body: { msisdn, masterAccountNumber } */
    @PostMapping("/link-subordinate")
    public ResponseEntity<Map> linkSubordinate(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        return forward("/acip/link-subordinate", Map.of(
                "subscriberNumber", "216" + msisdn,
                "masterAccountNumber", body.getOrDefault("masterAccountNumber", "")
        ));
    }

    /** Update refill barring. body: { msisdn, action: BAR|CLEAR|STEP } */
    @PostMapping("/refill-barring")
    public ResponseEntity<Map> refillBarring(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        return forward("/acip/update-refill-barring", Map.of(
                "subscriberNumber", "216" + msisdn,
                "action", body.getOrDefault("action", "BAR")
        ));
    }

    /** Update promotion counters. body: { msisdn, transactionCurrency, promotionRefillAmountRelative } */
    @PostMapping("/promotion-counters")
    public ResponseEntity<Map> promotionCounters(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("transactionCurrency", body.getOrDefault("transactionCurrency", "TND"));
        if (body.containsKey("promotionRefillAmountRelative"))
            payload.put("promotionRefillAmountRelative", body.get("promotionRefillAmountRelative"));
        return forward("/acip/update-promotion-counters", payload);
    }

    /** Update promotion plan. body: { msisdn, action, planId, oldStartDate, oldEndDate, startDate, endDate } */
    @PostMapping("/promotion-plan")
    public ResponseEntity<Map> promotionPlan(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("action", body.getOrDefault("action", "ACTIVATE"));
        if (body.containsKey("planId"))        payload.put("planId", body.get("planId"));
        if (body.containsKey("oldStartDate"))  payload.put("oldStartDate", body.get("oldStartDate"));
        if (body.containsKey("oldEndDate"))    payload.put("oldEndDate", body.get("oldEndDate"));
        if (body.containsKey("startDate"))     payload.put("startDate", body.get("startDate"));
        if (body.containsKey("endDate"))       payload.put("endDate", body.get("endDate"));
        return forward("/acip/update-promotion-plan", payload);
    }

    /** Update accumulators. body: { msisdn, accumulators: [{accumulatorId, relativeValue, absoluteValue, startDate}] } */
    @PostMapping("/accumulators")
    public ResponseEntity<Map> accumulators(@RequestBody Map<String, Object> body) {
        String msisdn = require(body, "msisdn");
        Map<String, Object> payload = new HashMap<>();
        payload.put("subscriberNumber", "216" + msisdn);
        payload.put("accumulators", body.getOrDefault("accumulators", List.of()));
        return forward("/acip/update-accumulators", payload);
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

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Map.of("success", false, "responseMessage", e.getMessage()));
    }
}
