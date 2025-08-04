from flask import Flask, request, jsonify
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route("/transaction-details", methods=["GET"])
def get_transaction_details():
    transaction_id_query = request.args.get("transactionId")
    if not transaction_id_query:
        return jsonify({"error": "Missing transactionId parameter"}), 400

    # Parse XML
    tree = ET.parse("transactionID_consommation_data.xml")
    root = tree.getroot()

    children = list(root)
    i = 0
    while i < len(children):
        if children[i].tag == "transactionId":
            tid = children[i].text.strip()
            if tid == transaction_id_query.strip():
                # Assume the next two are dedicatedAccountTD and contextParameterTD
                dedicated = children[i+1] if i+1 < len(children) and children[i+1].tag == "dedicatedAccountTD" else None
                context = children[i+2] if i+2 < len(children) and children[i+2].tag == "contextParameterTD" else None

                # Extract DA
                dedicated_accounts = []
                if dedicated is not None:
                    for da in dedicated.findall(".//dA"):
                        dedicated_accounts.append({
                            "dAId": da.findtext("dAId"),
                            "expiryDate": da.findtext("expiryDate"),
                            "dAAction": da.findtext("dAAction"),
                            "dAUnitType": da.findtext("dAUnitType"),
                            "dAUnitBalance": da.findtext("dAUnitBalance"),
                            "totalUnit": da.findtext("totalUnit")
                        })

                # Extract QoS
                context_parameters = []
                if context is not None:
                    for qos in context.findall(".//qOSInformation"):
                        context_parameters.append({
                            "qoSClassIdentifier": qos.findtext("qoSClassIdentifier"),
                            "aPNAggregateMaxBRDL": qos.findtext("aPNAggregateMaxBRDL"),
                            "aPNAggregateMaxBRUL": qos.findtext("aPNAggregateMaxBRUL")
                        })

                return jsonify({
                    "transactionId": tid,
                    "dedicatedAccountTD": dedicated_accounts,
                    "contextParameterTD": context_parameters
                })

        i += 1

    return jsonify({"error": "Transaction ID not found in XML"}), 404

if __name__ == "__main__":
    app.run(port=5001)
