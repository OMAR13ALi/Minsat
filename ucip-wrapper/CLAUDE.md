# UCIP/ACIP AIR-IP 3.0 — Spring Boot Wrapper

## What This Project Is

A **Spring Boot 3.2.3 / Java 17** REST service that exposes all ACIP and UCIP AIR-IP 3.0 methods
as HTTP endpoints. It handles XML building, raw TCP transport, response parsing, and error
normalisation so callers never touch raw XML.

Runs on **:8080**. All AIR calls from other services must go through this wrapper.

## Project Structure

```
ucip-wrapper/
├── CLAUDE.md                  ← you are here
├── pom.xml
└── src/
    ├── main/java/com/minsat/
    │   ├── air/
    │   │   ├── model/
    │   │   │   └── AirResponse.java        ← record: (success, responseCode, responseMessage,
    │   │   │                                           transactionId, data, raw)
    │   │   ├── transport/
    │   │   │   ├── AirTransport.java       ← interface
    │   │   │   ├── AirTransportImpl.java   ← raw TCP socket to AIR (HTTP/1.0 over TCP)
    │   │   │   └── AirTransportException.java
    │   │   ├── ucip/                       ← 13 UCIP method services
    │   │   │   ├── GetBalanceAndDate.java
    │   │   │   ├── GetAccountDetails.java
    │   │   │   ├── GetAccumulators.java
    │   │   │   ├── GetFaFList.java
    │   │   │   ├── GetAllowedServiceClasses.java
    │   │   │   ├── GetRefillOptions.java
    │   │   │   ├── UpdateAccountDetails.java
    │   │   │   ├── UpdateBalanceAndDate.java
    │   │   │   ├── UpdateCommunityList.java
    │   │   │   ├── UpdateFaFList.java
    │   │   │   ├── UpdateServiceClass.java
    │   │   │   ├── UpdateSubscriberSegmentation.java
    │   │   │   └── Refill.java
    │   │   ├── acip/                       ← 10 ACIP method services
    │   │   │   ├── InstallSubscriber.java
    │   │   │   ├── DeleteSubscriber.java
    │   │   │   ├── LinkSubordinateSubscriber.java
    │   │   │   ├── UpdateTemporaryBlocked.java
    │   │   │   ├── GetPromotionCounters.java
    │   │   │   ├── UpdatePromotionCounters.java
    │   │   │   ├── GetPromotionPlans.java
    │   │   │   ├── UpdatePromotionPlan.java
    │   │   │   ├── UpdateAccumulators.java
    │   │   │   └── UpdateRefillBarring.java
    │   │   └── xml/
    │   │       ├── XmlHelper.java          ← static helpers: mandatoryMembers, member,
    │   │       │                              memberInt, memberBool, memberDate,
    │   │       │                              wrapMethodCall, escape
    │   │       └── XmlParser.java          ← parses methodResponse XML into AirResponse
    │   ├── config/
    │   │   └── AirConfig.java              ← @ConfigurationProperties(prefix="air")
    │   └── controller/
    │       ├── HealthController.java
    │       ├── UcipController.java         ← POST /ucip/* with typed DTO records
    │       └── AcipController.java         ← POST /acip/* with typed DTO records
    └── test/java/com/minsat/
        ├── air/xml/
        │   └── XmlBuilderTest.java         ← tests for XmlHelper (22 tests, all passing)
        └── ucip/
            └── GetBalanceAndDateTest.java
```

## Technology Stack

- **Runtime**: Java 17 + Spring Boot 3.2.3
- **Transport**: Raw TCP socket (java.net.Socket) to AIR port 10010 — NOT HttpClient
- **XML building**: Hardcoded text blocks per method using XmlHelper static helpers
- **XML parsing**: Java DOM (javax.xml.parsers.DocumentBuilder)
- **Testing**: JUnit 5 + Mockito (22 tests passing)

## AIR Protocol

### Transport
- Raw TCP to `AIR_HOST:10010` — sends full HTTP/1.0 request as text over socket
- Each request: open socket → send → read until `</methodResponse>` → close
- Auth: HTTP Basic (configured in application.properties)

### XML Body Format
```xml
<?xml version="1.0"?>
<methodCall>
  <methodName>MethodName</methodName>
  <params><param><value><struct>
    <member><name>originNodeType</name><value><string>EXT</string></value></member>
    <member><name>originHostName</name><value><string>minsat</string></value></member>
    <member><name>originTransactionID</name><value><string>uuid</string></value></member>
    <member><name>originTimeStamp</name><value><dateTime.iso8601>YYYYMMDDTHHmmss+0000</dateTime.iso8601></value></member>
    <member><name>subscriberNumber</name><value><string>21669000001</string></value></member>
    <!-- method-specific fields -->
  </struct></value></param></params>
</methodCall>
```
- Requests use `<name>` tags. Responses may use `<n>` — the parser handles both.

### Hardcoded Method Pattern

Every service class follows this pattern:
```java
@Service
public class GetBalanceAndDate {
    private final AirConfig config;
    private final AirTransport airTransport;
    private final XmlParser xmlParser;

    public AirResponse execute(String subscriberNumber) {
        if (subscriberNumber == null || subscriberNumber.isBlank())
            throw new IllegalArgumentException("subscriberNumber is required");
        String txnId = UUID.randomUUID().toString();
        String members = XmlHelper.mandatoryMembers(config, txnId)
                       + XmlHelper.member("subscriberNumber", subscriberNumber);
        String xml = XmlHelper.wrapMethodCall("GetBalanceAndDate", members);
        try {
            return xmlParser.parseResponse(airTransport.send(xml, "GetBalanceAndDate"), txnId);
        } catch (AirTransportException e) {
            return AirResponse.networkError(e.getMessage());
        }
    }
}
```

## AirResponse Shape

```java
public record AirResponse(
    boolean success,          // true only when responseCode == 0
    int responseCode,         // raw AIR code (0 = ok, -1 = network error)
    String responseMessage,
    String transactionId,
    Map<String, Object> data, // parsed struct fields
    Map<String, Object> raw   // full parsed response
) {}
```

## UCIP Endpoints (`POST /ucip/*`)

| Path | Method | Key request fields |
|------|--------|--------------------|
| `/ucip/balance-and-date` | GetBalanceAndDate | `subscriberNumber` |
| `/ucip/account-details` | GetAccountDetails | `subscriberNumber`, `includeLocation` |
| `/ucip/accumulators` | GetAccumulators | `subscriberNumber` |
| `/ucip/faf-list` | GetFaFList | `subscriberNumber`, `requestedOwner` |
| `/ucip/allowed-service-classes` | GetAllowedServiceClasses | `subscriberNumber` |
| `/ucip/refill-options` | GetRefillOptions | `subscriberNumber`, `voucherCode`, `serviceClassCurrent` |
| `/ucip/update-balance-and-date` | UpdateBalanceAndDate | `subscriberNumber`, amounts, dates, DA list |
| `/ucip/update-account-details` | UpdateAccountDetails | `subscriberNumber`, `ussdEndOfCallNotificationId` |
| `/ucip/update-service-class` | UpdateServiceClass | `subscriberNumber`, `action`, `serviceClassNew` |
| `/ucip/update-faf-list` | UpdateFaFList | `subscriberNumber`, `action`, entries list |
| `/ucip/update-community-list` | UpdateCommunityList | `subscriberNumber`, communityIds list |
| `/ucip/update-subscriber-segmentation` | UpdateSubscriberSegmentation | `subscriberNumber`, `accountGroupId` |
| `/ucip/refill` | Refill | `subscriberNumber`, `voucherCode` OR amount+currency+profileId |

## ACIP Endpoints (`POST /acip/*`)

| Path | Method | Key request fields |
|------|--------|--------------------|
| `/acip/install` | InstallSubscriber | `subscriberNumber`, `serviceClassNew`, `temporaryBlockedFlag`, `languageId`, `ussdEocnId` |
| `/acip/delete` | DeleteSubscriber | `subscriberNumber`, `originOperatorId` |
| `/acip/link-subordinate` | LinkSubordinateSubscriber | `subscriberNumber`, `masterAccountNumber` |
| `/acip/update-temporary-blocked` | UpdateTemporaryBlocked | `subscriberNumber`, `blocked` |
| `/acip/promotion-counters` | GetPromotionCounters | `subscriberNumber` |
| `/acip/update-promotion-counters` | UpdatePromotionCounters | `subscriberNumber`, `transactionCurrency`, `promotionRefillAmountRelative` |
| `/acip/promotion-plans` | GetPromotionPlans | `subscriberNumber`, `originOperatorId` |
| `/acip/update-promotion-plan` | UpdatePromotionPlan | `subscriberNumber`, `action`, `planId`, dates |
| `/acip/update-accumulators` | UpdateAccumulators | `subscriberNumber`, accumulators list |
| `/acip/update-refill-barring` | UpdateRefillBarring | `subscriberNumber`, `action` (BAR/CLEAR/STEP) |

## Configuration (application.properties)

```properties
server.port=8080
air.host=10.13.96.38
air.port=10010
air.user=...
air.password=...
air.node-type=EXT
air.host-name=minsat
air.timeout-ms=10000
air.debug=false
```

## Commands

```bash
mvn clean package           # Build → target/ucip-wrapper-1.0.0.jar
mvn spring-boot:run         # Run on :8080
mvn test                    # 22 unit tests
curl http://localhost:8080/health
```
