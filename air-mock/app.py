#!/usr/bin/env python3
"""
Stateful AIR server mock — speaks HTTP/1.0 over TCP on port 8080.
Tracks subscriber state per MSISDN in memory so that update operations
actually affect subsequent reads. Field names and types match the UCIP v5
spec and real Ericsson AIR-IP 3.0.
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import re
import os
import copy

# ── Default subscriber state ──────────────────────────────────────────────────
# Matches the hardcoded values from the original mock.

DEFAULT_STATE = {
    "balance": 250000,          # accountValue1 (main balance, in millimes)
    "currency": "TND",
    "temporaryBlockedFlag": False,
    "serviceClassCurrent": 104,
    "serviceClassOriginal": 104,
    "fafList": [
        {"fafIndicator": 100, "fafNumber": "21650011210", "owner": "Subscriber"},
        {"fafIndicator": 100, "fafNumber": "21652988554", "owner": "Subscriber"},
    ],
    "accumulators": [
        {"id": 11, "value": 950, "startDate": "20250701T120000+0000", "resetDate": "20250801T120000+0000"},
        {"id": 20, "value": 0,   "startDate": "20250701T120000+0000", "resetDate": "20250801T120000+0000"},
    ],
    "dedicatedAccounts": [
        {"id": 1, "value": 70000000, "expiryDate": "20250831T120000+0000"},
        {"id": 2, "value": 48023000, "expiryDate": "20250731T120000+0000"},
    ],
}

# In-memory state, keyed by MSISDN string (e.g. "21669000001")
STATE = {}


def get_state(msisdn):
    if msisdn not in STATE:
        STATE[msisdn] = copy.deepcopy(DEFAULT_STATE)
    return STATE[msisdn]


# ── XML parsing helpers ───────────────────────────────────────────────────────

def extract_method_name(body):
    m = re.search(r'<methodName>\s*(.*?)\s*</methodName>', body)
    return m.group(1) if m else "Unknown"


def extract_string(body, name):
    """Extract <string> value of a named member."""
    m = re.search(
        r'<member>\s*<name>' + re.escape(name) + r'</name>\s*<value><string>(.*?)</string></value>',
        body
    )
    return m.group(1).strip() if m else None


def extract_int(body, name):
    """Extract <int> or <i4> value of a named member."""
    m = re.search(
        r'<member>\s*<name>' + re.escape(name) + r'</name>\s*<value><(?:int|i4)>(.*?)</(?:int|i4)></value>',
        body
    )
    if m:
        try:
            return int(m.group(1).strip())
        except ValueError:
            return None
    return None


def extract_boolean(body, name):
    """Extract <boolean> value (0→False, 1→True) of a named member."""
    m = re.search(
        r'<member>\s*<name>' + re.escape(name) + r'</name>\s*<value><boolean>(.*?)</boolean></value>',
        body
    )
    if m:
        return m.group(1).strip() == "1"
    return None


def extract_faf_numbers(body):
    """Extract all fafNumber strings from the fafInformation array."""
    # Find the fafInformation array block
    m = re.search(r'<member>\s*<name>fafInformation</name>.*?</member>', body, re.DOTALL)
    if not m:
        return []
    block = m.group(0)
    return re.findall(r'<member>\s*<name>fafNumber</name>\s*<value><string>(.*?)</string></value>', block)


# ── XML response builders ─────────────────────────────────────────────────────

_WRAP = ('<?xml version="1.0"?>\n'
         '<methodResponse><params><param><value><struct>\n'
         '{members}'
         '</struct></value></param></params></methodResponse>')

_CAPS = ('<member><name>negotiatedCapabilities</name><value><array><data>'
         '<value><i4>0</i4></value></data></array></value></member>\n'
         '<member><name>availableServerCapabilities</name><value><array><data>'
         '<value><i4>0</i4></value></data></array></value></member>\n')


def _m_str(name, val):
    return f'<member><name>{name}</name><value><string>{val}</string></value></member>\n'

def _m_int(name, val):
    return f'<member><name>{name}</name><value><i4>{val}</i4></value></member>\n'

def _m_bool(name, val):
    return f'<member><name>{name}</name><value><boolean>{"1" if val else "0"}</boolean></value></member>\n'

def _m_date(name, val):
    return f'<member><name>{name}</name><value><dateTime.iso8601>{val}</dateTime.iso8601></value></member>\n'


def build_get_balance_and_date(state):
    da_items = ""
    for da in state["dedicatedAccounts"]:
        da_items += (f'<value><struct>'
                     f'<member><name>dedicatedAccountID</name><value><i4>{da["id"]}</i4></value></member>'
                     f'<member><name>dedicatedAccountValue1</name><value><i4>{da["value"]}</i4></value></member>'
                     f'<member><name>expiryDate</name>'
                     f'<value><dateTime.iso8601>{da["expiryDate"]}</dateTime.iso8601></value></member>'
                     f'</struct></value>\n')
    members = (
        _m_int("responseCode", 0) +
        _m_str("originTransactionID", "mock-001") +
        _m_int("languageIDCurrent", 1) +
        _m_int("serviceClassCurrent", state["serviceClassCurrent"]) +
        _m_int("accountValue1", state["balance"]) +
        _m_str("currency1", state["currency"]) +
        _m_date("creditClearanceDate", "20400925T120000+0000") +
        _m_date("supervisionExpiryDate", "20371231T120000+0000") +
        _m_date("serviceRemovalDate", "20400925T120000+0000") +
        _m_date("serviceFeeExpiryDate", "20371231T120000+0000") +
        _m_bool("temporaryBlockedFlag", state["temporaryBlockedFlag"]) +
        f'<member><name>dedicatedAccountInformation</name><value><array><data>\n{da_items}'
        f'</data></array></value></member>\n' +
        _CAPS
    )
    return _WRAP.format(members=members)


def build_get_account_details(state):
    members = (
        _m_int("responseCode", 0) +
        _m_str("originTransactionID", "mock-002") +
        _m_int("languageIDCurrent", 1) +
        _m_int("serviceClassCurrent", state["serviceClassCurrent"]) +
        _m_int("serviceClassOriginal", state["serviceClassOriginal"]) +
        _m_date("activationDate", "20220427T120000+0000") +
        _m_int("ussdEndOfCallNotificationID", 1) +
        _m_bool("temporaryBlockedFlag", state["temporaryBlockedFlag"]) +
        _m_int("accountGroupID", 0) +
        _m_date("supervisionExpiryDate", "20371231T120000+0000") +
        _m_date("creditClearanceDate", "20400925T120000+0000") +
        _m_date("serviceRemovalDate", "20400925T120000+0000") +
        _m_date("serviceFeeExpiryDate", "20371231T120000+0000") +
        '<member><name>offerInformation</name><value><array><data>'
        '<value><struct>'
        '<member><name>offerID</name><value><i4>4990</i4></value></member>'
        '<member><name>expiryDate</name><value><dateTime.iso8601>99991231T000000+1200</dateTime.iso8601></value></member>'
        '<member><name>startDate</name><value><dateTime.iso8601>20230918T120000+0000</dateTime.iso8601></value></member>'
        '</struct></value>'
        '</data></array></value></member>\n'
        '<member><name>communityInformationCurrent</name><value><array><data>'
        '<value><struct>'
        '<member><name>communityID</name><value><i4>4288</i4></value></member>'
        '</struct></value>'
        '</data></array></value></member>\n' +
        _CAPS
    )
    return _WRAP.format(members=members)


def build_get_accumulators(state):
    acc_items = ""
    for acc in state["accumulators"]:
        acc_items += (f'<value><struct>'
                      f'<member><name>accumulatorID</name><value><i4>{acc["id"]}</i4></value></member>'
                      f'<member><name>accumulatorValue</name><value><i4>{acc["value"]}</i4></value></member>'
                      f'<member><name>accumulatorStartDate</name>'
                      f'<value><dateTime.iso8601>{acc["startDate"]}</dateTime.iso8601></value></member>'
                      f'<member><name>accumulatorResetDate</name>'
                      f'<value><dateTime.iso8601>{acc["resetDate"]}</dateTime.iso8601></value></member>'
                      f'</struct></value>\n')
    members = (
        _m_int("responseCode", 0) +
        _m_str("originTransactionID", "mock-003") +
        _m_int("languageIDCurrent", 1) +
        _m_int("serviceClassCurrent", state["serviceClassCurrent"]) +
        f'<member><name>accumulatorInformation</name><value><array><data>\n{acc_items}'
        f'</data></array></value></member>\n' +
        _CAPS
    )
    return _WRAP.format(members=members)


def build_get_faf_list(state):
    faf_items = ""
    for faf in state["fafList"]:
        faf_items += (f'<value><struct>'
                      f'<member><name>fafIndicator</name><value><i4>{faf["fafIndicator"]}</i4></value></member>'
                      f'<member><name>fafNumber</name><value><string>{faf["fafNumber"]}</string></value></member>'
                      f'<member><name>owner</name><value><string>{faf["owner"]}</string></value></member>'
                      f'</struct></value>\n')
    members = (
        _m_int("responseCode", 0) +
        _m_str("originTransactionID", "mock-004") +
        f'<member><name>fafInformationList</name><value><array><data>\n{faf_items}'
        f'</data></array></value></member>\n' +
        _CAPS
    )
    return _WRAP.format(members=members)


# ── Static responses (no state needed) ───────────────────────────────────────

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
<member><name>promotionRefillAmount</name><value><i4>0</i4></value></member>
<member><name>promotionRefillAmountRelative</name><value><i4>0</i4></value></member>
</struct></value></param></params></methodResponse>"""

GET_PROMOTION_PLANS = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-008</string></value></member>
<member><name>promotionPlanInformation</name><value><array><data>
  <value><struct>
    <member><name>promotionPlanID</name><value><i4>1</i4></value></member>
    <member><name>promotionStartDate</name><value><dateTime.iso8601>20250101T000000+0000</dateTime.iso8601></value></member>
    <member><name>promotionEndDate</name><value><dateTime.iso8601>20251231T235959+0000</dateTime.iso8601></value></member>
  </struct></value>
</data></array></value></member>
</struct></value></param></params></methodResponse>"""

SUCCESS = """<?xml version="1.0"?>
<methodResponse><params><param><value><struct>
<member><name>responseCode</name><value><int>0</int></value></member>
<member><name>originTransactionID</name><value><string>mock-ok</string></value></member>
<member><name>negotiatedCapabilities</name><value><array><data><value><i4>0</i4></value></data></array></value></member>
<member><name>availableServerCapabilities</name><value><array><data><value><i4>0</i4></value></data></array></value></member>
</struct></value></param></params></methodResponse>"""


# ── HTTP handler ──────────────────────────────────────────────────────────────

class AirMockHandler(BaseHTTPRequestHandler):

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8", errors="replace")

        method = extract_method_name(body)
        msisdn = extract_string(body, "subscriberNumber") or "unknown"
        state = get_state(msisdn)

        print(f"[AIR-MOCK] >> {method} | MSISDN={msisdn}")

        response_body = self._route(method, body, state)
        response_bytes = response_body.strip().encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "text/xml")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

    def _route(self, method, body, state):

        # ── Stateful GET methods ──────────────────────────────────────────────
        if method == "GetBalanceAndDate":
            return build_get_balance_and_date(state)

        if method == "GetAccountDetails":
            return build_get_account_details(state)

        if method == "GetAccumulators":
            return build_get_accumulators(state)

        if method == "GetFaFList":
            return build_get_faf_list(state)

        # ── Static GET methods ────────────────────────────────────────────────
        if method == "GetAllowedServiceClasses":
            return GET_ALLOWED_SERVICE_CLASSES

        if method == "GetRefillOptions":
            return GET_REFILL_OPTIONS

        if method == "GetPromotionCounters":
            return GET_PROMOTION_COUNTERS

        if method == "GetPromotionPlans":
            return GET_PROMOTION_PLANS

        # ── State-mutating UPDATE methods ─────────────────────────────────────

        if method == "UpdateTemporaryBlocked":
            # XmlHelper.memberBool → <boolean>0/1</boolean>
            flag = extract_boolean(body, "temporaryBlockedFlag")
            if flag is not None:
                state["temporaryBlockedFlag"] = flag
                print(f"[AIR-MOCK]    temporaryBlockedFlag → {flag}")

        elif method == "UpdateServiceClass":
            # XmlHelper.memberInt → <int>VALUE</int>
            sc = extract_int(body, "serviceClassNew")
            action = extract_string(body, "serviceClassAction")
            if action == "DeleteTemporary":
                # Restore original
                state["serviceClassCurrent"] = state["serviceClassOriginal"]
                print(f"[AIR-MOCK]    serviceClass reset to original ({state['serviceClassOriginal']})")
            elif sc is not None:
                state["serviceClassCurrent"] = sc
                print(f"[AIR-MOCK]    serviceClassCurrent → {sc}")

        elif method == "UpdateFaFList":
            # fafAction is a string: ADD | SET | DELETE
            action = extract_string(body, "fafAction")
            faf_numbers = extract_faf_numbers(body)
            if action == "DELETE" and faf_numbers:
                before = len(state["fafList"])
                state["fafList"] = [
                    f for f in state["fafList"] if f["fafNumber"] not in faf_numbers
                ]
                print(f"[AIR-MOCK]    FAF DELETE {faf_numbers} ({before}→{len(state['fafList'])})")
            elif action == "ADD" and faf_numbers:
                existing = {f["fafNumber"] for f in state["fafList"]}
                for num in faf_numbers:
                    if num not in existing:
                        state["fafList"].append({"fafIndicator": 100, "fafNumber": num, "owner": "Subscriber"})
                        existing.add(num)
                print(f"[AIR-MOCK]    FAF ADD {faf_numbers} (total={len(state['fafList'])})")
            elif action == "SET":
                # Replace entire list
                state["fafList"] = [
                    {"fafIndicator": 100, "fafNumber": num, "owner": "Subscriber"}
                    for num in faf_numbers
                ]
                print(f"[AIR-MOCK]    FAF SET → {faf_numbers}")

        elif method == "Refill":
            # Two paths: voucher code OR voucherless (transactionAmount + currency + profileId)
            voucher = extract_string(body, "voucherActivationCode")
            if voucher:
                # Voucher refill — mock adds a fixed amount
                amount = 10000
                state["balance"] += amount
                print(f"[AIR-MOCK]    Refill via voucher '{voucher}' → +{amount}, balance={state['balance']}")
            else:
                # Voucherless — transactionAmount is a string like "5000"
                amount_str = extract_string(body, "transactionAmount")
                try:
                    amount = int(amount_str) if amount_str else 0
                except ValueError:
                    amount = 0
                state["balance"] += amount
                print(f"[AIR-MOCK]    Refill voucherless +{amount} → balance={state['balance']}")

        elif method == "UpdateBalanceAndDate":
            # adjustmentAmountRelative is a STRING (sent via XmlHelper.member())
            amount_str = extract_string(body, "adjustmentAmountRelative")
            try:
                amount = int(amount_str) if amount_str else 0
            except ValueError:
                amount = 0
            state["balance"] += amount
            print(f"[AIR-MOCK]    UpdateBalance +{amount} → balance={state['balance']}")

        elif method == "UpdateAccountDetails":
            # May include a service class change
            sc = extract_int(body, "serviceClassNew")
            if sc is not None:
                state["serviceClassCurrent"] = sc
                print(f"[AIR-MOCK]    serviceClassCurrent → {sc}")

        # All other methods (UpdateCommunityList, UpdateSubscriberSegmentation,
        # InstallSubscriber, DeleteSubscriber, LinkSubordinateSubscriber,
        # UpdatePromotionCounters, UpdatePromotionPlan, UpdateAccumulators,
        # UpdateRefillBarring) succeed silently without state changes.

        return SUCCESS

    def log_message(self, fmt, *args):
        pass  # suppress default Apache-style access log; we print our own above


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    server = HTTPServer(("0.0.0.0", port), AirMockHandler)
    print(f"[AIR-MOCK] Listening on :{port} — stateful Ericsson AIR simulation")
    print(f"[AIR-MOCK] State is in-memory; each new MSISDN starts with balance=250000 TND, SC=104, unblocked")
    server.serve_forever()
