package com.minsat.subscriber;

import com.minsat.config.UcipProperties;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Thin wrapper around RestTemplate that calls the ucip-wrapper service at :8080.
 * All subscriber numbers are passed with the "216" country-code prefix.
 */
@Component
public class UcipClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public UcipClient(RestTemplate restTemplate, UcipProperties props) {
        this.restTemplate = restTemplate;
        this.baseUrl = props.getBaseUrl();
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getBalanceAndDate(String msisdn) {
        return post("/ucip/balance-and-date", Map.of("subscriberNumber", "216" + msisdn));
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getAccountDetails(String msisdn) {
        return post("/ucip/account-details", Map.of("subscriberNumber", "216" + msisdn, "includeLocation", false));
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getFaFList(String msisdn) {
        return post("/ucip/faf-list", Map.of("subscriberNumber", "216" + msisdn));
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getAccumulators(String msisdn) {
        return post("/ucip/accumulators", Map.of("subscriberNumber", "216" + msisdn));
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getAllowedServiceClasses(String msisdn) {
        return post("/ucip/allowed-service-classes", Map.of("subscriberNumber", "216" + msisdn));
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getRefillOptions(String msisdn, Integer serviceClassCurrent) {
        Map<String, Object> body = new java.util.HashMap<>();
        body.put("subscriberNumber", "216" + msisdn);
        if (serviceClassCurrent != null) body.put("serviceClassCurrent", serviceClassCurrent);
        return post("/ucip/refill-options", body);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getPromotionCounters(String msisdn) {
        return post("/acip/promotion-counters", Map.of("subscriberNumber", "216" + msisdn));
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getPromotionPlans(String msisdn) {
        return post("/acip/promotion-plans", Map.of("subscriberNumber", "216" + msisdn, "originOperatorId", "1"));
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> post(String path, Object body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> entity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(
                baseUrl + path, HttpMethod.POST, entity, Map.class);
        return response.getBody();
    }
}
