#!/usr/bin/env python3
"""
Simple AIR server mock — speaks HTTP/1.0 over TCP on port 8080.
Returns realistic XML-RPC responses for each UCIP/ACIP method.
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import re

# ── Read responses ────────────────────────────────────────────────────────────

GET_BALANCE_AND_DATE = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-001</string></value></member>
<member><name>currentBalance</name><value><string>250000</string></value></member>
<member><name>currency</name><value><string>TND</string></value></member>
<member><name>creditClearanceDate</name><value><dateTime.iso8601>20400925T120000+0000</dateTime.iso8601></value></member>
<member><name>supervisionExpiryDate</name><value><dateTime.iso8601>20371231T120000+0000</dateTime.iso8601></value></member>
<member><name>serviceRemovalDate</name><value><dateTime.iso8601>20400925T120000+0000</dateTime.iso8601></value></member>
<member><name>serviceFeeExpiryDate</name><value><dateTime.iso8601>20371231T120000+0000</dateTime.iso8601></value></member>
<member><name>dedicatedAccountInformation</name><value><array><data>
  <value><struct>
    <member><name>dedicatedAccountID</name><value><i4>1</i4></value></member>
    <member><name>dedicatedAccountValue</name><value><string>70000000</string></value></member>
    <member><name>expiryDate</name><value><dateTime.iso8601>20250831T120000+0000</dateTime.iso8601></value></member>
  </struct></value>
  <value><struct>
    <member><name>dedicatedAccountID</name><value><i4>2</i4></value></member>
    <member><name>dedicatedAccountValue</name><value><string>48023000</string></value></member>
    <member><name>expiryDate</name><value><dateTime.iso8601>20250731T120000+0000</dateTime.iso8601></value></member>
  </struct></value>
</data></array></value></member>
</struct></value></param></params></methodResponse>"""

GET_ACCOUNT_DETAILS = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-002</string></value></member>
<member><name>serviceClassCurrent</name><value><i4>104</i4></value></member>
<member><name>activationDate</name><value><dateTime.iso8601>20220427T120000+0000</dateTime.iso8601></value></member>
<member><name>ussdEndOfCallNotificationID</name><value><i4>1</i4></value></member>
<member><name>temporaryBlockedFlag</name><value><boolean>0</boolean></value></member>
<member><name>supervisionExpiryDate</name><value><dateTime.iso8601>20371231T120000+0000</dateTime.iso8601></value></member>
<member><name>creditClearanceDate</name><value><dateTime.iso8601>20400925T120000+0000</dateTime.iso8601></value></member>
<member><name>serviceRemovalDate</name><value><dateTime.iso8601>20400925T120000+0000</dateTime.iso8601></value></member>
<member><name>offerInformation</name><value><array><data>
  <value><struct>
    <member><name>offerID</name><value><i4>4990</i4></value></member>
    <member><name>expiryDate</name><value><dateTime.iso8601>99991231T000000+1200</dateTime.iso8601></value></member>
    <member><name>startDate</name><value><dateTime.iso8601>20230918T120000+0000</dateTime.iso8601></value></member>
  </struct></value>
</data></array></value></member>
<member><name>communityInformation</name><value><array><data>
  <value><struct>
    <member><name>communityID</name><value><i4>4288</i4></value></member>
  </struct></value>
</data></array></value></member>
</struct></value></param></params></methodResponse>"""

GET_ACCUMULATORS = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-003</string></value></member>
<member><name>accumulatorInformation</name><value><array><data>
  <value><struct>
    <member><name>accumulatorID</name><value><i4>11</i4></value></member>
    <member><name>accumulatorValue</name><value><string>950</string></value></member>
    <member><name>accumulatorStartDate</name><value><dateTime.iso8601>20250701T120000+0000</dateTime.iso8601></value></member>
    <member><name>accumulatorResetDate</name><value><dateTime.iso8601>20250801T120000+0000</dateTime.iso8601></value></member>
  </struct></value>
  <value><struct>
    <member><name>accumulatorID</name><value><i4>20</i4></value></member>
    <member><name>accumulatorValue</name><value><string>0</string></value></member>
    <member><name>accumulatorStartDate</name><value><dateTime.iso8601>20250701T120000+0000</dateTime.iso8601></value></member>
    <member><name>accumulatorResetDate</name><value><dateTime.iso8601>20250801T120000+0000</dateTime.iso8601></value></member>
  </struct></value>
</data></array></value></member>
</struct></value></param></params></methodResponse>"""

GET_FAF_LIST = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-004</string></value></member>
<member><name>friendAndFamilyList</name><value><array><data>
  <value><struct>
    <member><name>fafIndicator</name><value><i4>100</i4></value></member>
    <member><name>fafNumber</name><value><string>21650011210</string></value></member>
    <member><name>owner</name><value><string>Subscriber</string></value></member>
  </struct></value>
  <value><struct>
    <member><name>fafIndicator</name><value><i4>100</i4></value></member>
    <member><name>fafNumber</name><value><string>21652988554</string></value></member>
    <member><name>owner</name><value><string>Subscriber</string></value></member>
  </struct></value>
</data></array></value></member>
</struct></value></param></params></methodResponse>"""

GET_ALLOWED_SERVICE_CLASSES = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-005</string></value></member>
<member><name>serviceClassList</name><value><array><data>
  <value><int>100</int></value>
  <value><int>101</int></value>
  <value><int>104</int></value>
</data></array></value></member>
<member><name>serviceClassCurrent</name><value><int>104</int></value></member>
<member><name>negotiatedCapabilities</name><value><array><data><value><i4>0</i4></value></data></array></value></member>
<member><name>availableServerCapabilities</name><value><array><data><value><i4>0</i4></value></data></array></value></member>
</struct></value></param></params></methodResponse>"""

GET_REFILL_OPTIONS = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-006</string></value></member>
<member><name>refillOptions</name><value><array><data>
  <value><int>9</int></value>
  <value><int>12</int></value>
  <value><int>78</int></value>
</data></array></value></member>
<member><name>serviceClassCurrent</name><value><i4>104</i4></value></member>
<member><name>negotiatedCapabilities</name><value><array><data><value><i4>0</i4></value></data></array></value></member>
<member><name>availableServerCapabilities</name><value><array><data><value><i4>0</i4></value></data></array></value></member>
</struct></value></param></params></methodResponse>"""

GET_PROMOTION_COUNTERS = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-007</string></value></member>
<member><name>promotionRefillAmount</name><value><string>0</string></value></member>
<member><name>promotionRefillAmountRelative</name><value><string>0</string></value></member>
</struct></value></param></params></methodResponse>"""

GET_PROMOTION_PLANS = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-008</string></value></member>
<member><name>promotionPlanInformation</name><value><array><data>
</data></array></value></member>
</struct></value></param></params></methodResponse>"""

# Generic success for all update/write methods
SUCCESS = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-ok</string></value></member>
<member><name>negotiatedCapabilities</name><value><array><data><value><i4>0</i4></value></data></array></value></member>
<member><name>availableServerCapabilities</name><value><array><data><value><i4>0</i4></value></data></array></value></member>
</struct></value></param></params></methodResponse>"""

RESPONSES = {
    "GetBalanceAndDate":        GET_BALANCE_AND_DATE,
    "GetAccountDetails":        GET_ACCOUNT_DETAILS,
    "GetAccumulators":          GET_ACCUMULATORS,
    "GetFaFList":               GET_FAF_LIST,
    "GetAllowedServiceClasses": GET_ALLOWED_SERVICE_CLASSES,
    "GetRefillOptions":         GET_REFILL_OPTIONS,
    "GetPromotionCounters":     GET_PROMOTION_COUNTERS,
    "GetPromotionPlans":        GET_PROMOTION_PLANS,
    # All update/write methods return generic success
    "UpdateBalanceAndDate":             SUCCESS,
    "UpdateAccountDetails":             SUCCESS,
    "UpdateServiceClass":               SUCCESS,
    "UpdateFaFList":                    SUCCESS,
    "UpdateCommunityList":              SUCCESS,
    "UpdateSubscriberSegmentation":     SUCCESS,
    "UpdateUsageThresholdsAndCounters": SUCCESS,
    "Refill":                           SUCCESS,
    "InstallSubscriber":                SUCCESS,
    "DeleteSubscriber":                 SUCCESS,
    "LinkSubordinateSubscriber":        SUCCESS,
    "UpdateTemporaryBlocked":           SUCCESS,
    "UpdatePromotionCounters":          SUCCESS,
    "UpdatePromotionPlan":              SUCCESS,
    "UpdateAccumulators":               SUCCESS,
    "UpdateRefillBarring":              SUCCESS,
}


class AirMockHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8", errors="replace")

        match = re.search(r"<methodName>\s*(.*?)\s*</methodName>", body)
        method = match.group(1) if match else "Unknown"
        print(f"[AIR-MOCK] >> {method}")

        response_body = RESPONSES.get(method, SUCCESS)
        response_bytes = response_body.strip().encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "text/xml")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

    def log_message(self, fmt, *args):
        pass  # suppress default access log, we print our own above


if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 8080), AirMockHandler)
    print("[AIR-MOCK] Listening on :8080 — simulating Ericsson AIR server")
    server.serve_forever()
