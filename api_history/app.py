from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
import xml.etree.ElementTree as ET
from datetime import datetime
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

app = Flask(__name__)
CORS(app)

USE_MOCK = True  # Set to False to call the real Ericsson server
REQUEST_TIMEOUT = 20  # Timeout in seconds
MAX_WORKERS = 5  # Maximum number of concurrent threads for transaction detail fetching
USE_SIMPLE_FETCHING = True  # Set to True to use simpler, more reliable fetching method

def remove_namespace(doc, namespace):
    """Remove namespace from XML elements"""
    ns = f"{{{namespace}}}"
    nsl = len(ns)
    for elem in doc.iter():
        if elem.tag.startswith(ns):
            elem.tag = elem.tag[nsl:]

def get_text_safe(elem, tag):
    """Safely get text from XML element"""
    if elem is None:
        return None
    found = elem.find(tag)
    return found.text.strip() if found is not None and found.text else None

def fetch_single_transaction_detail(transaction_id):
    """Fetch details for a single transaction with timeout"""
    try:
        url = "http://10.13.67.20:8080/testShrTD.pub"  # Matches your curl endpoint
        params = {'transactionId': transaction_id.strip()}
        headers = {
            'User-Agent': 'minsat/4.1/1.0',
            'Authorization': 'Basic bWluc2F0MTptaW5zYXQxMjM='
        }

        # Send GET request
        response = requests.get(url, params=params, headers=headers, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()

        # Parse XML response
        tree = ET.parse(BytesIO(response.content))
        root = tree.getroot()
        remove_namespace(root, "http://www.ericsson.se/SubscriptionHistoryProtocol")


        transaction_data = {
            "dedicatedAccountTD": [],
            "contextParameterTD": []
        }

        for elem in root:
            tag = elem.tag.strip()

            if tag == "dedicatedAccountTD":
                for dA in elem.findall("dA"):
                    da_entry = {
                        "dAId": get_text_safe(dA, "dAId"),
                        "expiryDate": get_text_safe(dA, "expiryDate"),
                        "dAUnitBalance": get_text_safe(dA, "dAUnitBalance")
                    }
                    # Only add if at least one field has data
                    if any(da_entry.values()):
                        transaction_data["dedicatedAccountTD"].append(da_entry)

            elif tag == "contextParameterTD":
                for context in elem.findall(".//contextParameter"):
                    qos = context.find("qOSInformation")
                    if qos is not None:
                        context_entry = {
                            "qoSClassIdentifier": get_text_safe(qos, "qoSClassIdentifier"),
                            "aPNAggregateMaxBRDL": get_text_safe(qos, "aPNAggregateMaxBRDL"),
                            "aPNAggregateMaxBRUL": get_text_safe(qos, "aPNAggregateMaxBRUL")
                        }
                        # Only add if at least one field has data
                        if any(context_entry.values()):
                            transaction_data["contextParameterTD"].append(context_entry)

        return transaction_id, transaction_data

    except requests.exceptions.Timeout:
        print(f"Timeout fetching transaction details for {transaction_id}")
        return transaction_id, {}
    except requests.exceptions.RequestException as e:
        print(f"Error fetching transaction details for {transaction_id}: {e}")
        return transaction_id, {}
    except Exception as e:
        print(f"Unexpected error fetching transaction details for {transaction_id}: {e}")
        return transaction_id, {}

def fetch_transaction_details_from_server_simple(transaction_ids):
    """Simpler approach: fetch transaction details with individual timeouts"""
    if not transaction_ids:
        return {}
    
    transaction_data = {}
    
    # Use ThreadPoolExecutor for concurrent requests
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        # Submit all tasks
        future_to_tid = {
            executor.submit(fetch_single_transaction_detail, tid): tid 
            for tid in transaction_ids
        }
        
        # Wait for all to complete, but don't timeout the whole batch
        for future in future_to_tid:
            tid = future_to_tid[future]
            try:
                # Each individual request already has timeout=REQUEST_TIMEOUT
                result_tid, data = future.result(timeout=REQUEST_TIMEOUT + 1)
                transaction_data[result_tid] = data
            except Exception as e:
                print(f"Failed to get details for transaction {tid}: {e}")
                transaction_data[tid] = {}
    
    return transaction_data

def fetch_transaction_details_from_server(transaction_ids):
    """Fetch transaction details concurrently with timeout"""
    if not transaction_ids:
        return {}
    
    transaction_data = {}
    
    # Use ThreadPoolExecutor for concurrent requests
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        # Submit all tasks
        future_to_tid = {
            executor.submit(fetch_single_transaction_detail, tid): tid 
            for tid in transaction_ids
        }
        
        # Collect results as they complete, with a reasonable total timeout
        total_timeout = REQUEST_TIMEOUT * 3  # Give more time for all requests
        completed_count = 0
        total_count = len(future_to_tid)
        
        try:
            for future in as_completed(future_to_tid, timeout=total_timeout):
                try:
                    tid, data = future.result(timeout=1)  # Individual result timeout
                    transaction_data[tid] = data
                    completed_count += 1
                except Exception as e:
                    tid = future_to_tid[future]
                    print(f"Error processing transaction {tid}: {e}")
                    transaction_data[tid] = {}
                    completed_count += 1
                    
        except Exception as e:
            # Handle timeout or other issues with remaining futures
            unfinished_count = total_count - completed_count
            print(f"Warning: {unfinished_count} of {total_count} transaction detail requests did not complete in time")
            
            # Add empty details for unfinished transactions
            for future, tid in future_to_tid.items():
                if tid not in transaction_data:
                    transaction_data[tid] = {}
                    print(f"Adding empty details for unfinished transaction: {tid}")
    
    return transaction_data

def load_transaction_details():
    """Load transaction details from local XML file"""
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
                
                transaction_id = elem.text.strip() if elem.text else None
                if transaction_id:
                    current_transaction = {
                        "transactionId": transaction_id,
                        "dedicatedAccountTD": [],
                        "contextParameterTD": []
                    }

            elif tag == "dedicatedAccountTD" and current_transaction:
                for dA in elem.findall("dA"):
                    da_entry = {
                        "dAId": get_text_safe(dA, "dAId"),
                        "expiryDate": get_text_safe(dA, "expiryDate"),
                        "dAUnitBalance": get_text_safe(dA, "dAUnitBalance")
                    }
                    if any(da_entry.values()):
                        current_transaction["dedicatedAccountTD"].append(da_entry)

            elif tag == "contextParameterTD" and current_transaction:
                for context in elem.findall(".//contextParameter"):
                    qos = context.find("qOSInformation")
                    if qos is not None:
                        context_entry = {
                            "qoSClassIdentifier": get_text_safe(qos, "qoSClassIdentifier"),
                            "aPNAggregateMaxBRDL": get_text_safe(qos, "aPNAggregateMaxBRDL"),
                            "aPNAggregateMaxBRUL": get_text_safe(qos, "aPNAggregateMaxBRUL")
                        }
                        if any(context_entry.values()):
                            current_transaction["contextParameterTD"].append(context_entry)

        # Don't forget the last transaction
        if current_transaction:
            transactions.append(current_transaction)

        return {
            t["transactionId"]: {
                "dedicatedAccountTD": t["dedicatedAccountTD"],
                "contextParameterTD": t["contextParameterTD"]
            }
            for t in transactions if t.get("transactionId")
        }

    except FileNotFoundError:
        print("Local XML file not found")
        return {}
    except Exception as e:
        print(f"Error loading XML details: {e}")
        return {}

@app.route('/', methods=['GET'])
def index():
    return '<h2>API is running. Use POST /history/transactionByNumber</h2>'

@app.route('/history/transactionByNumber', methods=['POST'])
def transactionByNumberPost():
    """Handle POST request for transaction history"""
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'JSON data is required'}), 400
        
        msisdn = data.get('msisdn')
        start_date = data.get('startDate')
        end_date = data.get('endDate')

        if not msisdn:
            return jsonify({'error': 'msisdn is required'}), 400

        return transactionByNumber(msisdn, start_date)
    except Exception as e:
        return jsonify({'error': f'Invalid request: {str(e)}'}), 400

@app.route('/history/transactionByNumber/<subscriberNumber>', methods=['GET'])
def transactionByNumber(subscriberNumber=None, startDate=None):
    """Get transaction history for a subscriber"""
    try:
        if not subscriberNumber:
            return jsonify({'error': 'subscriberNumber is required'}), 400

        if USE_MOCK:
            try:
                with open("response_api.xml", "rb") as f:
                    tree = ET.parse(f)
            except FileNotFoundError:
                return jsonify({"error": "Mock file 'response_api.xml' not found"}), 500
        else:
            base_url = "http://10.13.67.20/shrMA.pub"
            
            # Use provided startDate or default to today
            if not startDate:
                startDate = datetime.now().strftime('%Y-%m-%d')
            
            params = {
                'msisdn': subscriberNumber,
                'startDate': startDate,
                'transactionTypes': 'adjustmentMA,cDRMA,aIRSRefillMA,pAMEvaluationMA'
            }
            headers = {
                'User-Agent': 'minsat/4.1/1.0',
                'Authorization': 'Basic bWluc2F0MTptaW5zYXQxMjM='
            }
            
            try:
                response = requests.get(base_url, params=params, headers=headers, timeout=REQUEST_TIMEOUT)
                response.raise_for_status()
                tree = ET.parse(BytesIO(response.content))
            except requests.exceptions.Timeout:
                return jsonify({"error": "Request timeout - server did not respond within 5 seconds"}), 504
            except requests.exceptions.RequestException as e:
                return jsonify({"error": f"Error connecting to server: {str(e)}"}), 502

        root = tree.getroot()
        remove_namespace(root, "http://www.ericsson.se/SubscriptionHistoryProtocol")

        # Collect all transaction IDs first
        transaction_ids = []
        for service in root:
            if get_text_safe(service, 'subscriberNumber') == subscriberNumber:
                tid = get_text_safe(service, 'transactionId')
                if tid:
                    transaction_ids.append(tid)

        # Fetch transaction details
        if USE_MOCK:
            transaction_details_map = load_transaction_details()
        else:
            if USE_SIMPLE_FETCHING:
                transaction_details_map = fetch_transaction_details_from_server_simple(transaction_ids)
            else:
                transaction_details_map = fetch_transaction_details_from_server(transaction_ids)

        # Initialize result arrays
        Usage, PAM, Refill, SDPAdjustment = [], [], [], []

        # Process each service
        for service in root:
            subscriber = get_text_safe(service, 'subscriberNumber')
            if subscriber != subscriberNumber:
                continue

            tag = service.tag
            tid = get_text_safe(service, 'transactionId')

            if tag == 'cDRMA':
                charging_context = get_text_safe(service, 'chargingContext')
                service_id = get_text_safe(service, 'serviceIdentifier')

                if not charging_context or not service_id:
                    continue

                # Determine service type
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
                # Remove None values
                usage_entry = {k: v for k, v in usage_entry.items() if v is not None}
                Usage.append(usage_entry)

            elif tag == 'aIRSRefillMA':
                refill = {
                    'transactionId': tid,
                    'transactionDateTime': get_text_safe(service, 'transactionDateTime'),
                    'transactionAmount': get_text_safe(service, 'nominalAmount'),
                    'paymentProfile': get_text_safe(service, 'voucherGroup'),
                    'voucherSerialNumber': get_text_safe(service, 'voucherSerialNumber'),
                    'activationCode': get_text_safe(service, 'activationCode'),
                    'mainAccountBalance': get_text_safe(service, 'mainAccountBalance'),
                    'externalData1': get_text_safe(service, 'externalData1'),
                    'externalData2': get_text_safe(service, 'externalData2'),
                    'originNodeId': get_text_safe(service, 'originNodeId'),
                    'segmentationId': get_text_safe(service, 'segmentationId'),
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
                print(SDPAdjustment)  # Fixed typo: Print -> print

        print(f"Processed {len(Usage)} usage, {len(PAM)} PAM, {len(Refill)} refill, {len(SDPAdjustment)} adjustment transactions")
        
        return jsonify({
            "Usage": Usage,
            "PAM": PAM,
            "Refill": Refill,
            "SDPAdjustment": SDPAdjustment
        })

    except Exception as e:
        print(f"Unexpected error in transactionByNumber: {e}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)