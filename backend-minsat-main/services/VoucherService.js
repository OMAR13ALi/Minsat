import axios from 'axios';
import xml2js from 'xml2js';
import dotenv from 'dotenv';
dotenv.config();

const IS_DEV = process.env.NODE_ENV === 'development';

const VOUCHER_URL = process.env.VOUCHER_URL || 'http://10.13.0.49:10020/VoucherAdmin';
const VOUCHER_AUTH = process.env.VOUCHER_AUTH || 'Basic bmd2c3VzZXI6VmVudGVAQElOQEAyMDIz';

const formatDate = (isoDateObj) => {
  const isoString = isoDateObj?.["dateTime.iso8601"] || isoDateObj || '';
  if (!isoString.trim()) return 'N/A';
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString('fr-TN', { timeZone: 'Africa/Tunis' });
};

// Fonction principale
export async function getVoucherDetails(lookupValue, lookupType = 'serialNumber') {
  console.log(`🔁 Récupération VoucherDetails pour ${lookupType} = ${lookupValue}`);

  // 🧪 MOCK
  if (IS_DEV) {
    console.log('🧪 Mode mock activé');
    return {
      responseCode: "0",
      batchId: "OTN_E1_3477",
      currency: "TND",
      expiryDate: "2035-07-23T23:59:59+0100",
      state: "5",
      value: "1000",
      voucherGroup: "EC1",
      activationCode: "77389917213394",
      agent: "bilel",
      operatorId: "ngvsuser",
      timestamp: "2025-07-23T10:27:59+0100",
      serialNumber: "801615602193",
      subscriberId: "21654058216",
      used: "2025-07-31T10:12:34+0100"
    };
  }

  // 🔁 PROD XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <methodCall>
    <methodName>GetVoucherDetails</methodName>
    <params>
      <param>
        <value>
          <struct>
            <member>
              <name>${lookupType}</name>
              <value><string>${lookupValue}</string></value>
            </member>
          </struct>
        </value>
      </param>
    </params>
  </methodCall>`;

  try {
    const response = await axios.post(VOUCHER_URL, xml, {
      headers: {
        'Content-Type': 'text/xml',
        'Accept': 'text/xml',
        'SOAPAction': '"run"',
        'Authorization': VOUCHER_AUTH,
        'User-Agent': 'ADM/2.4/7.0'
      },
      timeout: 60000
    });

    const parsed = await xml2js.parseStringPromise(response.data, { explicitArray: false });
    const members = parsed?.methodResponse?.params?.param?.value?.struct?.member || [];

    const voucherData = {};
    members.forEach(m => {
      voucherData[m.name] = m.value;
    });

    return {
      responseCode: voucherData.responseCode?.i4 || 'N/A',
      batchId: voucherData.batchId?.string || 'N/A',
      currency: voucherData.currency?.string || 'N/A',
      expiryDate: formatDate(voucherData.expiryDate),
      state: voucherData.state?.i4 || 'N/A',
      value: voucherData.value?.string || 'N/A',
      voucherGroup: voucherData.voucherGroup?.string || 'N/A',
      activationCode: voucherData.activationCode?.string || 'N/A',
      agent: voucherData.agent?.string || 'N/A',
      operatorId: voucherData.operatorId?.string || 'N/A',
      timestamp: formatDate(voucherData.timestamp),
      serialNumber: voucherData.serialNumber?.string || 'N/A',
      subscriberId: voucherData.subscriberId?.string || 'N/A',
      used: formatDate(voucherData.used)
    };

  } catch (err) {
    console.error('❌ Erreur SOAP getVoucherDetails:', err.message);
    throw err;
  }
}
