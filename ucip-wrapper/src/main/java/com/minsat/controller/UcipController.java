package com.minsat.controller;

import com.minsat.air.model.AirResponse;
import com.minsat.air.ucip.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ucip")
public class UcipController {

    // ---- Request DTOs ----

    public record SubscriberRequest(@NotBlank String subscriberNumber) {}

    public record GetAccountDetailsRequest(
            @NotBlank String subscriberNumber,
            boolean includeLocation) {}

    public record GetFaFListRequest(
            @NotBlank String subscriberNumber,
            String requestedOwner) {}

    public record GetRefillOptionsRequest(
            @NotBlank String subscriberNumber,
            String voucherCode,
            Integer serviceClassCurrent) {}

    public record UpdateBalanceAndDateRequest(
            @NotBlank String subscriberNumber,
            String currency,
            String adjustmentAmount,
            String supervisionExpiryDate,
            String serviceFeeExpiryDate,
            Integer creditClearancePeriod,
            Integer serviceRemovalPeriod,
            List<DaUpdate> dedicatedAccounts) {
        public record DaUpdate(int accountId, String relativeAmount, String absoluteValue) {}
    }

    public record UpdateAccountDetailsRequest(
            @NotBlank String subscriberNumber,
            @NotNull Integer ussdEndOfCallNotificationId) {}

    public record UpdateServiceClassRequest(
            @NotBlank String subscriberNumber,
            @NotBlank String action,
            Integer serviceClassNew) {}

    public record UpdateFaFListRequest(
            @NotBlank String subscriberNumber,
            @NotBlank String action,
            List<FafEntry> entries) {
        public record FafEntry(String fafNumber, String owner) {}
    }

    public record UpdateCommunityListRequest(
            @NotBlank String subscriberNumber,
            List<Integer> communityIds) {}

    public record UpdateSubscriberSegmentationRequest(
            @NotBlank String subscriberNumber,
            int accountGroupId) {}

    public record RefillRequest(
            @NotBlank String subscriberNumber,
            String voucherCode,
            String amount,
            String currency,
            String profileId) {}

    // ---- Service dependencies ----

    private final GetBalanceAndDate getBalanceAndDate;
    private final GetAccountDetails getAccountDetails;
    private final GetAccumulators getAccumulators;
    private final GetFaFList getFaFList;
    private final UpdateBalanceAndDate updateBalanceAndDate;
    private final UpdateAccountDetails updateAccountDetails;
    private final GetAllowedServiceClasses getAllowedServiceClasses;
    private final UpdateServiceClass updateServiceClass;
    private final UpdateFaFList updateFaFList;
    private final GetRefillOptions getRefillOptions;
    private final Refill refill;
    private final UpdateCommunityList updateCommunityList;
    private final UpdateSubscriberSegmentation updateSubscriberSegmentation;

    public UcipController(
            GetBalanceAndDate getBalanceAndDate,
            GetAccountDetails getAccountDetails,
            GetAccumulators getAccumulators,
            GetFaFList getFaFList,
            UpdateBalanceAndDate updateBalanceAndDate,
            UpdateAccountDetails updateAccountDetails,
            GetAllowedServiceClasses getAllowedServiceClasses,
            UpdateServiceClass updateServiceClass,
            UpdateFaFList updateFaFList,
            GetRefillOptions getRefillOptions,
            Refill refill,
            UpdateCommunityList updateCommunityList,
            UpdateSubscriberSegmentation updateSubscriberSegmentation) {
        this.getBalanceAndDate = getBalanceAndDate;
        this.getAccountDetails = getAccountDetails;
        this.getAccumulators = getAccumulators;
        this.getFaFList = getFaFList;
        this.updateBalanceAndDate = updateBalanceAndDate;
        this.updateAccountDetails = updateAccountDetails;
        this.getAllowedServiceClasses = getAllowedServiceClasses;
        this.updateServiceClass = updateServiceClass;
        this.updateFaFList = updateFaFList;
        this.getRefillOptions = getRefillOptions;
        this.refill = refill;
        this.updateCommunityList = updateCommunityList;
        this.updateSubscriberSegmentation = updateSubscriberSegmentation;
    }

    // ---- Endpoints ----

    @PostMapping("/balance-and-date")
    public ResponseEntity<AirResponse> balanceAndDate(@Valid @RequestBody SubscriberRequest req) {
        try {
            return ResponseEntity.ok(getBalanceAndDate.execute(req.subscriberNumber()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/account-details")
    public ResponseEntity<AirResponse> accountDetails(@Valid @RequestBody GetAccountDetailsRequest req) {
        try {
            return ResponseEntity.ok(getAccountDetails.execute(req.subscriberNumber(), req.includeLocation()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/accumulators")
    public ResponseEntity<AirResponse> accumulators(@Valid @RequestBody SubscriberRequest req) {
        try {
            return ResponseEntity.ok(getAccumulators.execute(req.subscriberNumber()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/faf-list")
    public ResponseEntity<AirResponse> fafList(@Valid @RequestBody GetFaFListRequest req) {
        try {
            return ResponseEntity.ok(getFaFList.execute(req.subscriberNumber(), req.requestedOwner()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/allowed-service-classes")
    public ResponseEntity<AirResponse> allowedServiceClasses(@Valid @RequestBody SubscriberRequest req) {
        try {
            return ResponseEntity.ok(getAllowedServiceClasses.execute(req.subscriberNumber()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/refill-options")
    public ResponseEntity<AirResponse> refillOptions(@Valid @RequestBody GetRefillOptionsRequest req) {
        try {
            return ResponseEntity.ok(getRefillOptions.execute(
                    req.subscriberNumber(), req.voucherCode(), req.serviceClassCurrent()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-balance")
    public ResponseEntity<AirResponse> updateBalance(@Valid @RequestBody UpdateBalanceAndDateRequest req) {
        try {
            List<UpdateBalanceAndDate.DedicatedAccountUpdate> das = req.dedicatedAccounts() == null ? List.of()
                    : req.dedicatedAccounts().stream()
                        .map(d -> new UpdateBalanceAndDate.DedicatedAccountUpdate(
                                d.accountId(), d.relativeAmount(), d.absoluteValue()))
                        .toList();
            return ResponseEntity.ok(updateBalanceAndDate.execute(
                    req.subscriberNumber(), req.currency(), req.adjustmentAmount(),
                    req.supervisionExpiryDate(), req.serviceFeeExpiryDate(),
                    req.creditClearancePeriod(), req.serviceRemovalPeriod(), das));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-account-details")
    public ResponseEntity<AirResponse> updateAccountDetails(@Valid @RequestBody UpdateAccountDetailsRequest req) {
        try {
            return ResponseEntity.ok(updateAccountDetails.execute(
                    req.subscriberNumber(), req.ussdEndOfCallNotificationId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-service-class")
    public ResponseEntity<AirResponse> updateServiceClass(@Valid @RequestBody UpdateServiceClassRequest req) {
        try {
            return ResponseEntity.ok(updateServiceClass.execute(
                    req.subscriberNumber(), req.action(), req.serviceClassNew()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-faf-list")
    public ResponseEntity<AirResponse> updateFafList(@Valid @RequestBody UpdateFaFListRequest req) {
        try {
            List<UpdateFaFList.FafEntry> entries = req.entries() == null ? List.of()
                    : req.entries().stream()
                        .map(e -> new UpdateFaFList.FafEntry(e.fafNumber(), e.owner()))
                        .toList();
            return ResponseEntity.ok(updateFaFList.execute(req.subscriberNumber(), req.action(), entries));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/refill")
    public ResponseEntity<AirResponse> refill(@Valid @RequestBody RefillRequest req) {
        try {
            return ResponseEntity.ok(refill.execute(
                    req.subscriberNumber(), req.voucherCode(),
                    req.amount(), req.currency(), req.profileId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-community")
    public ResponseEntity<AirResponse> updateCommunity(@Valid @RequestBody UpdateCommunityListRequest req) {
        try {
            return ResponseEntity.ok(updateCommunityList.execute(req.subscriberNumber(), req.communityIds()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }

    @PostMapping("/update-segmentation")
    public ResponseEntity<AirResponse> updateSegmentation(@Valid @RequestBody UpdateSubscriberSegmentationRequest req) {
        try {
            return ResponseEntity.ok(updateSubscriberSegmentation.execute(
                    req.subscriberNumber(), req.accountGroupId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(AirResponse.validationError(e.getMessage()));
        }
    }
}
