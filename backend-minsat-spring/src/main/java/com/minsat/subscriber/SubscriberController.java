package com.minsat.subscriber;

import com.minsat.hlr.HlrService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SubscriberController {

    private final SubscriberService subscriberService;
    private final HlrService hlrService;

    public SubscriberController(SubscriberService subscriberService, HlrService hlrService) {
        this.subscriberService = subscriberService;
        this.hlrService = hlrService;
    }

    @GetMapping("/msisdn/{msisdn}")
    public ResponseEntity<Map<String, Object>> getMsisdnInformation(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getMsisdnInformation(msisdn));
    }

    @GetMapping("/account-details/{msisdn}")
    public ResponseEntity<Map<String, Object>> getAccountDetails(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getAccountDetails(msisdn));
    }

    @GetMapping("/balance-and-date/{msisdn}")
    public ResponseEntity<Map<String, Object>> getBalanceAndDate(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getBalanceAndDate(msisdn));
    }

    @GetMapping("/faf-list/{msisdn}")
    public ResponseEntity<Map<String, Object>> getFaFList(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getFaFList(msisdn));
    }

    @GetMapping("/accumulators/{msisdn}")
    public ResponseEntity<Map<String, Object>> getAccumulators(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getAccumulators(msisdn));
    }

    @GetMapping("/hlr/{msisdn}")
    public ResponseEntity<Map<String, Object>> getHlrStatus(@PathVariable String msisdn) {
        return ResponseEntity.ok(hlrService.getHlrStatus(msisdn));
    }

    @GetMapping("/promotion-counters/{msisdn}")
    public ResponseEntity<Map<String, Object>> getPromotionCounters(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getPromotionCounters(msisdn));
    }

    @GetMapping("/promotion-plans/{msisdn}")
    public ResponseEntity<Map<String, Object>> getPromotionPlans(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getPromotionPlans(msisdn));
    }

    @GetMapping("/allowed-service-classes/{msisdn}")
    public ResponseEntity<Map<String, Object>> getAllowedServiceClasses(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getAllowedServiceClasses(msisdn));
    }

    @GetMapping("/refill-options/{msisdn}")
    public ResponseEntity<Map<String, Object>> getRefillOptions(@PathVariable String msisdn) {
        return ResponseEntity.ok(subscriberService.getRefillOptions(msisdn, null));
    }
}
