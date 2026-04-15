# Integration Plan: PHP Admin-IN → React + Spring Boot

## Context
The PHP `Admin-IN` is the production app calling real Ericsson AIR. The Spring Boot project uses `air-mock` for development. This plan ensures UCIP/ACIP logic and data flow match between both systems.

**Admin-IN (PHP)** connects to: `10.13.0.53:10010/Air` + `10.13.0.49-50:10020/VoucherAdmin`  
**Your project (Spring)** connects to: `air-mock:8080` (dev) or `10.13.96.38:10010` (prod)

---

## Status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Add GetOffers + GetUsageThresholdsAndCounters to ucip-wrapper | TODO |
| 2 | Wire new methods into SubscriberService + air-mock | TODO |
| 3 | Display Offers & Usage Thresholds on frontend | TODO |
| 4 | Add ChangeVoucherState (backend + frontend) | TODO |
| 5 | Verify VoucherDetails parity | TODO |

---

## Phase 1: Add Missing UCIP Methods to ucip-wrapper

PHP `accounts.php` calls 7 AIR methods. Spring ucip-wrapper only has 5 of them.

**Missing:**
- `GetOffers` — returns active offers for a subscriber
- `GetUsageThresholdsAndCounters` — returns usage thresholds and counters

### Tasks
1. Create `ucip-wrapper/.../ucip/GetOffers.java` (same pattern as GetBalanceAndDate)
2. Create `ucip-wrapper/.../ucip/GetUsageThresholdsAndCounters.java`
3. Add 2 new POST endpoints to `UcipController.java`:
   - `POST /ucip/offers` → `GetOffers`
   - `POST /ucip/usage-thresholds` → `GetUsageThresholdsAndCounters`

---

## Phase 2: Wire into SubscriberService + Update air-mock

### Tasks
1. Add `getOffers()` and `getUsageThresholds()` to `UcipClient.java`
2. Include them in `SubscriberService.getMsisdnInformation()` (parallel async calls)
3. Add mock responses for GetOffers and GetUsageThresholdsAndCounters to `air-mock/app.py`
4. Add standalone endpoints to `SubscriberController.java`:
   - `GET /api/offers/{msisdn}`
   - `GET /api/usage-thresholds/{msisdn}`

---

## Phase 3: Display Offers & Usage Thresholds on Frontend

### Tasks
1. Add "Offers" table to `GetMsisdnInformation.jsx` (columns: OfferID, StartDate, ExpiryDate)
2. Add "Usage Thresholds" table (columns: CounterID, Value, MoneyType, UsageType)
3. Both tables should match the PHP rendering from `accounts.php`

---

## Phase 4: Add ChangeVoucherState

PHP `changestatus.php` sends XML-RPC to VoucherAdmin. Completely missing from Spring.

### Tasks
1. Add `changeVoucherState()` to `VoucherService.java`
2. Add `POST /voucher/change-state` to `VoucherController.java`
3. Create `ChangeVoucherStateRequest.java` record
4. Create `ChangeVoucherStatus.jsx` frontend page
5. Add route `/vs/change-status` + sidebar entry

---

## Phase 5: Verify VoucherDetails Parity

### Tasks
1. Compare `VoucherService.java` XML-RPC format vs PHP `serialnumber.php` / `activationcode.php`
2. Verify endpoint URL and auth match
3. Test response parsing against expected fields

---

## Key Comparison Notes

| Aspect | PHP | Spring Boot | Match? |
|--------|-----|-------------|--------|
| XML field names (`<name>` tags) | `<name>` | `<name>` | YES |
| Mandatory fields (5) | All present | All present | YES |
| subscriberNumberNAI | `<i4>1</i4>` | `<int>1</int>` | YES (both valid) |
| originTransactionID | Hardcoded "32" | UUID | OK (Spring better) |
| originTimeStamp | Old fixed date | Current UTC | OK (Spring better) |
| Response parsing | simplexml→JSON→string | DOM→typed Map | OK (Spring more robust) |
| Response tag handling | `<name>` only | Both `<name>` and `<n>` | OK |
| GetOffers | YES | **MISSING** | Phase 1 |
| GetUsageThresholdsAndCounters | YES | **MISSING** | Phase 1 |
| ChangeVoucherState | YES | **MISSING** | Phase 4 |
| DB tables | adminin (same as minsat) | minsat | MATCH |