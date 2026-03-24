package com.minsat.controller;

import com.minsat.air.acip.*;
import com.minsat.air.model.AirResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acip")
public class AcipController {

    // ---- Request DTOs ----

    public record SubscriberRequest(@NotBlank String subscriberNumber) {}

    public record InstallSubscriberRequest(
            @NotBlank String subscriberNumber,
            int serviceClassNew,
            boolean temporaryBlockedFlag,
            int languageId,
            int ussdEocnId) {}

    public record DeleteSubscriberRequest(
            @NotBlank String subscriberNumber,
            String originOperatorId) {}

    public record LinkSubordinateRequest(
            @NotBlank String subscriberNumber,
            @NotBlank String masterAccountNumber) {}

    public record UpdateBlockedRequest(
            @NotBlank String subscriberNumber,
            @NotNull Boolean blocked) {}

    public record UpdatePromotionCountersRequest(
            @NotBlank String subscriberNumber,
            String transactionCurrency,
            String promotionRefillAmountRelative) {}

    public record GetPromotionPlansRequest(
            @NotBlank String subscriberNumber,
            String originOperatorId) {}

    public record UpdatePromotionPlanRequest(
            @NotBlank String subscriberNumber,
            @NotBlank String action,
            String planId,
            String oldStartDate,
            String oldEndDate,
            String startDate,
            String endDate) {}

    public record UpdateAccumulatorsRequest(
            @NotBlank String subscriberNumber,
            @NotNull List<AccEntry> accumulators) {
        public record AccEntry(int accumulatorId, String relativeValue, String absoluteValue, String startDate) {}
    }

    public record UpdateRefillBarringRequest(
            @NotBlank String subscriberNumber,
            @NotBlank String action) {}

    // ---- Service dependencies ----

    private final InstallSubscriber installSubscriber;
    private final DeleteSubscriber deleteSubscriber;
    private final LinkSubordinateSubscriber linkSubordinateSubscriber;
    private final UpdateTemporaryBlocked updateTemporaryBlocked;
    private final GetPromotionCounters getPromotionCounters;
    private final UpdatePromotionCounters updatePromotionCounters;
    private final GetPromotionPlans getPromotionPlans;
    private final UpdatePromotionPlan updatePromotionPlan;
    private final UpdateAccumulators updateAccumulators;
    private final UpdateRefillBarring updateRefillBarring;

    public AcipController(
            InstallSubscriber installSubscriber,
            DeleteSubscriber deleteSubscriber,
            LinkSubordinateSubscriber linkSubordinateSubscriber,
            UpdateTemporaryBlocked updateTemporaryBlocked,
            GetPromotionCounters getPromotionCounters,
            UpdatePromotionCounters updatePromotionCounters,
            GetPromotionPlans getPromotionPlans,
            UpdatePromotionPlan updatePromotionPlan,
            UpdateAccumulators updateAccumulators,
            UpdateRefillBarring updateRefillBarring) {
        this.installSubscriber = installSubscriber;
        this.deleteSubscriber = deleteSubscriber;
        this.linkSubordinateSubscriber = linkSubordinateSubscriber;
        this.updateTemporaryBlocked = updateTemporaryBlocked;
        this.getPromotionCounters = getPromotionCounters;
        this.updatePromotionCounters = updatePromotionCounters;
        this.getPromotionPlans = getPromotionPlans;
        this.updatePromotionPlan = updatePromotionPlan;
        this.updateAccumulators = updateAccumulators;
        this.updateRefillBarring = updateRefillBarring;
    }

    // ---- Endpoints ----

    @PostMapping("/install")
    public ResponseEntity<AirResponse> install(@Valid @RequestBody InstallSubscriberRequest req) {
        try {
            return ResponseEntity.ok(installSubscriber.execute(
                    req.subscriberNumber(), req.serviceClassNew(),
                    req.temporaryBlockedFlag(), req.languageId(), req.ussdEocnId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<AirResponse> delete(@Valid @RequestBody DeleteSubscriberRequest req) {
        try {
            return ResponseEntity.ok(deleteSubscriber.execute(req.subscriberNumber(), req.originOperatorId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/link-subordinate")
    public ResponseEntity<AirResponse> linkSubordinate(@Valid @RequestBody LinkSubordinateRequest req) {
        try {
            return ResponseEntity.ok(linkSubordinateSubscriber.execute(
                    req.subscriberNumber(), req.masterAccountNumber()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-blocked")
    public ResponseEntity<AirResponse> updateBlocked(@Valid @RequestBody UpdateBlockedRequest req) {
        try {
            return ResponseEntity.ok(updateTemporaryBlocked.execute(req.subscriberNumber(), req.blocked()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/promotion-counters")
    public ResponseEntity<AirResponse> promotionCounters(@Valid @RequestBody SubscriberRequest req) {
        try {
            return ResponseEntity.ok(getPromotionCounters.execute(req.subscriberNumber()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-promotion-counters")
    public ResponseEntity<AirResponse> updatePromotionCounters(@Valid @RequestBody UpdatePromotionCountersRequest req) {
        try {
            return ResponseEntity.ok(updatePromotionCounters.execute(
                    req.subscriberNumber(), req.transactionCurrency(), req.promotionRefillAmountRelative()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/promotion-plans")
    public ResponseEntity<AirResponse> promotionPlans(@Valid @RequestBody GetPromotionPlansRequest req) {
        try {
            return ResponseEntity.ok(getPromotionPlans.execute(req.subscriberNumber(), req.originOperatorId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-promotion-plan")
    public ResponseEntity<AirResponse> updatePromotionPlan(@Valid @RequestBody UpdatePromotionPlanRequest req) {
        try {
            return ResponseEntity.ok(updatePromotionPlan.execute(
                    req.subscriberNumber(), req.action(),
                    req.planId(), req.oldStartDate(), req.oldEndDate(),
                    req.startDate(), req.endDate()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-accumulators")
    public ResponseEntity<AirResponse> updateAccumulators(@Valid @RequestBody UpdateAccumulatorsRequest req) {
        try {
            List<UpdateAccumulators.AccumulatorEntry> entries = req.accumulators().stream()
                    .map(a -> new UpdateAccumulators.AccumulatorEntry(
                            a.accumulatorId(), a.relativeValue(), a.absoluteValue(), a.startDate()))
                    .toList();
            return ResponseEntity.ok(updateAccumulators.execute(req.subscriberNumber(), entries));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-refill-barring")
    public ResponseEntity<AirResponse> updateRefillBarring(@Valid @RequestBody UpdateRefillBarringRequest req) {
        try {
            return ResponseEntity.ok(updateRefillBarring.execute(req.subscriberNumber(), req.action()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }
}
