from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
import xml.etree.ElementTree as ET
from datetime import datetime
import requests

app = Flask(__name__)
CORS(app)

USE_MOCK = True  # Set to False to call the real Ericsson server

def remove_namespace(doc, namespace):
    ns = f"{{{namespace}}}"
    nsl = len(ns)
    for elem in doc.iter():
        if elem.tag.startswith(ns):
            elem.tag = elem.tag[nsl:]

def get_text_safe(elem, tag):
    found = elem.find(tag)
    return found.text if found is not None else None

def fetch_transaction_details_from_server(transaction_ids):
    try:
        transaction_data = {}
        for tid in transaction_ids:
            url = "http://10.13.67.20/shrMA.pub"
            params = {
                'transactionId': tid.strip()
            }
            headers = {
                'User-Agent': 'minsat/4.1/1.0',
                'Authorization': 'Basic bWluc2F0MTptaW5zYXQxMjM='
            }
            response = requests.get(url, params=params, headers=headers)
            response.raise_for_status()

            tree = ET.parse(BytesIO(response.content))
            root = tree.getroot()
            remove_namespace(root, "http://www.ericsson.se/SubscriptionHistoryProtocol")

            current_transaction = {
                "dedicatedAccountTD": [],
                "contextParameterTD": []
            }

            for elem in root:
                tag = elem.tag.strip()

                if tag == "dedicatedAccountTD":
                    for dA in elem.findall("dA"):
                        da_entry = {
                            "dAId": dA.findtext("dAId"),
                            "expiryDate": dA.findtext("expiryDate"),
                            "dAAction": dA.findtext("dAAction"),
                            "dAUnitType": dA.findtext("dAUnitType"),
                            "dAUnitBalance": dA.findtext("dAUnitBalance"),
                            "totalUnit": dA.findtext("totalUnit")
                        }
                        current_transaction["dedicatedAccountTD"].append(da_entry)

                elif tag == "contextParameterTD":
                    for context in elem.findall(".//contextParameter"):
                        qos = context.find("qOSInformation")
                        if qos is not None:
                            context_entry = {
                                "qoSClassIdentifier": qos.findtext("qoSClassIdentifier"),
                                "aPNAggregateMaxBRDL": qos.findtext("aPNAggregateMaxBRDL"),
                                "aPNAggregateMaxBRUL": qos.findtext("aPNAggregateMaxBRUL")
                            }
                            current_transaction["contextParameterTD"].append(context_entry)

            transaction_data[tid] = current_transaction

        return transaction_data

    except Exception as e:
        print("Error fetching transaction details from server:", e)
        return {}

def load_transaction_details():
    try:
        tree = ET.parse("transactionID_consommation_data.xml")
        root = tree.getroot()
        transactions = []

        current_transaction = None

        for elem in root:
            tag = elem.tag.strip()

            if tag == "transactionId":
                if current_transaction:
                    transactions.append(current_transaction)
                current_transaction = {
                    "transactionId": elem.text.strip(),
                    "dedicatedAccountTD": [],
                    "contextParameterTD": []
                }

            elif tag == "dedicatedAccountTD" and current_transaction:
                for dA in elem.findall("dA"):
                    da_entry = {
                        "dAId": dA.findtext("dAId"),
                        "expiryDate": dA.findtext("expiryDate"),
                        "dAAction": dA.findtext("dAAction"),
                        "dAUnitType": dA.findtext("dAUnitType"),
                        "dAUnitBalance": dA.findtext("dAUnitBalance"),
                        "totalUnit": dA.findtext("totalUnit")
                    }
                    current_transaction["dedicatedAccountTD"].append(da_entry)

            elif tag == "contextParameterTD" and current_transaction:
                for context in elem.findall(".//contextParameter"):
                    qos = context.find("qOSInformation")
                    if qos is not None:
                        context_entry = {
                            "qoSClassIdentifier": qos.findtext("qoSClassIdentifier"),
                            "aPNAggregateMaxBRDL": qos.findtext("aPNAggregateMaxBRDL"),
                            "aPNAggregateMaxBRUL": qos.findtext("aPNAggregateMaxBRUL")
                        }
                        current_transaction["contextParameterTD"].append(context_entry)

        if current_transaction:
            transactions.append(current_transaction)

        return {
            t["transactionId"]: {
                "dedicatedAccountTD": t["dedicatedAccountTD"],
                "contextParameterTD": t["contextParameterTD"]
            }
            for t in transactions if t["transactionId"]
        }

    except Exception as e:
        print("Error loading XML details:", e)
        return {}

@app.route('/', methods=['GET'])
def index():
    return '<h2>API is running. Use POST /history/transactionByNumber</h2>'

@app.route('/history/transactionByNumber', methods=['POST'])
def transactionByNumberPost():
    data = request.json
    msisdn = data.get('msisdn')
    start_date = data.get('startDate')
    end_date = data.get('endDate')

    if not msisdn:
        return jsonify({'error': 'msisdn is required'}), 400

    return transactionByNumber(msisdn, start_date)

@app.route('/history/transactionByNumber/<subscriberNumber>', methods=['GET'])
def transactionByNumber(subscriberNumber=None, startDate=None):
    try:
        if USE_MOCK:
            with open("response_api.xml", "rb") as f:
                tree = ET.parse(f)
        else:
            base_url = "http://10.13.67.20/shrMA.pub"
            params = {
                'msisdn': subscriberNumber,
                'startDate': startDate or datetime.now().strftime('%Y%m%d%H%M%S'),
                'transactionTypes': 'adjustmentMA,cDRMA,aIRSRefillMA,pAMEvaluationMA'
            }
            headers = {
                'User-Agent': 'minsat/4.1/1.0',
                'Authorization': 'Basic bWluc2F0MTptaW5zYXQxMjM='
            }
            response = requests.get(base_url, params=params, headers=headers)
            response.raise_for_status()
            tree = ET.parse(BytesIO(response.content))

        root = tree.getroot()
        remove_namespace(root, "http://www.ericsson.se/SubscriptionHistoryProtocol")

        transaction_ids = []
        for service in root:
            tid = get_text_safe(service, 'transactionId')
            if tid:
                transaction_ids.append(tid.strip())

        transaction_details_map = load_transaction_details() if USE_MOCK else fetch_transaction_details_from_server(transaction_ids)

        Usage, PAM, Refill, SDPAdjustment = [], [], [], []

        for service in root:
            subscriber = get_text_safe(service, 'subscriberNumber')
            if subscriber != subscriberNumber:
                continue

            tag = service.tag
            tid = get_text_safe(service, 'transactionId')
            tid = tid.strip() if tid else None

            if tag == 'cDRMA':
                charging_context = get_text_safe(service, 'chargingContext')
                service_id = get_text_safe(service, 'serviceIdentifier')

                if charging_context is None or service_id is None:
                    continue

                if 'OCS' in charging_context:
                    service_type = "MMS" if service_id == "20" else "DATA"
                elif 'SCAP' in charging_context:
                    service_type = "SMS" if service_id == "1" else "VOICE"
                else:
                    service_type = "VOICE"

                location = get_text_safe(service, 'locationNumber') or ""
                hplmn = 1 if location.startswith(("216", "60501")) else 0

                usage_entry = {
                    'transactionId': tid,
                    'transactionDateTime': get_text_safe(service, 'transactionDateTime'),
                    'serviceIdentifier': service_id,
                    'chargingContext': charging_context,
                    'serviceType': service_type,
                    'HPLMN': hplmn,
                    'locationNumber': location,
                    'bNumber': get_text_safe(service, 'otherPartyNumber'),
                    'duration': get_text_safe(service, 'duration'),
                    'transactionAmount': get_text_safe(service, 'transactionAmount'),
                    'dataVolume': get_text_safe(service, 'dataVolume'),
                    'mainAccountBalance': get_text_safe(service, 'mainAccountBalance'),
                    'details': transaction_details_map.get(tid, {}) if tid else {}
                }
                usage_entry = {k: v for k, v in usage_entry.items() if v is not None}
                Usage.append(usage_entry)

            elif tag == 'aIRSRefillMA':
                refill = {
                    'transactionId': tid,
                    'transactionDateTime': get_text_safe(service, 'transactionDateTime'),
                    'transactionAmount': get_text_safe(service, 'nominalAmount'),
                    'paymentProfile': get_text_safe(service, 'voucherGroup'),
                    'mainAccountBalance': get_text_safe(service, 'mainAccountBalance'),
                    'externalData1': get_text_safe(service, 'externalData1'),
                    'externalData2': get_text_safe(service, 'externalData2'),
                    'originNodeId': get_text_safe(service, 'originNodeId'),
                    'details': transaction_details_map.get(tid, {}) if tid else {}
                }
                refill = {k: v for k, v in refill.items() if v is not None}
                Refill.append(refill)

            elif tag == 'pAMEvaluationMA':
                pam = {
                    'transactionId': tid,
                    'transactionDateTime': get_text_safe(service, 'transactionDateTime'),
                    'EventType': get_text_safe(service, 'pAMEventType'),
                    'details': transaction_details_map.get(tid, {}) if tid else {}
                }
                pam = {k: v for k, v in pam.items() if v is not None}
                PAM.append(pam)

            elif tag == 'adjustmentMA':
                adj = {
                    'transactionId': tid,
                    'transactionDateTime': get_text_safe(service, 'transactionDateTime'),
                    'serviceCode': get_text_safe(service, 'externalData1'),
                    'service': get_text_safe(service, 'externalData2'),
                    'transactionAmount': get_text_safe(service, 'transactionAmount'),
                    'originNodeId': get_text_safe(service, 'originNodeId'),
                    'details': transaction_details_map.get(tid, {}) if tid else {}
                }
                adj = {k: v for k, v in adj.items() if v is not None}
                SDPAdjustment.append(adj)

        return jsonify({
            "Usage": Usage,
            "PAM": PAM,
            "Refill": Refill,
            "SDPAdjustment": SDPAdjustment
        })

    except FileNotFoundError:
        return jsonify({"error": "Mock file not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)