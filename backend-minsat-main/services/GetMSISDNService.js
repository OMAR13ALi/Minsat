import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import dotenv from 'dotenv';
import { connectToDatabase } from '../config/db.js';

dotenv.config();

const AIR_URL = process.env.AIR_URL || 'http://10.13.0.53:10010/Air';
const AIR_AUTH = process.env.AIR_AUTH || 'Basic a2FkZTprYWRlMTIzCg==';
const IS_DEV = process.env.NODE_ENV === 'development';

// Fonction pour convertir les octets en Go
const bytesToGB = (bytes) => {
  const gb = parseInt(bytes) / 1073741824; // 1 Go = 1 073 741 824 octets
  return gb.toFixed(2); // Retourne avec 2 décimales
};

async function sendAirRequest(xml) {
  if (IS_DEV) {
    console.log('🧪 Mode mock activé, pas d\'appel SOAP');
    return { methodResponse: { params: { param: { value: { struct: { member: [] } } } } } }; // Structure vide pour mock
  }

  try {
    const response = await axios.post(AIR_URL, xml, {
      headers: {
        'Content-Type': 'text/xml',
        'Accept': 'text/xml',
        'SOAPAction': '"run"',
        'Authorization': AIR_AUTH,
        'User-Agent': 'UGw Server/4.3/1.0'
      },
      timeout: 60000
    });
    return await parseStringPromise(response.data, { explicitArray: false });
  } catch (err) {
    console.error('❌ Erreur SOAP:', err.message);
    throw err;
  }
}
  
// Fonction manquante pour parser la réponse XML (exemple basé sur getBalanceAndDate)
function parseXml(response) {
  const members = response?.methodResponse?.params?.param?.value?.struct?.member || [];
  const result = {};
  members.forEach(m => {
    result[m.name] = m.value;
  });
  if (result.dedicatedAccountInformation?.array?.data?.value) {
    result.dedicatedAccountInformation.array.data.value = Array.isArray(result.dedicatedAccountInformation.array.data.value)
      ? result.dedicatedAccountInformation.array.data.value
      : [result.dedicatedAccountInformation.array.data.value];
  }
  return result;
}

export async function getUsageThresholdsAndCounters(msisdn) {
  console.log(`🔁 getUsageThresholdsAndCounters pour ${msisdn}`);

  // Obtenir le pool MySQL avec gestion d'erreur
  let pool;
  try {
    pool = await connectToDatabase();
    console.log('✅ Pool obtenu:', pool);
  } catch (err) {
    console.error('❌ Erreur lors de la connexion à la base de données:', err.message);
    throw new Error('Erreur de connexion à la base de données');
  }

  if (IS_DEV) {
    console.log('🧪 Mode mock activé');
    let mockData = [
      {
        usageCounterID: 200,
        usageCounterValue: "86046626687",
        usageThresholdInformation: [
          { usageThresholdID: 2001, usageThresholdSource: 3, usageThresholdValue: bytesToGB("5368709120") },
          { usageThresholdID: 2002, usageThresholdSource: 3, usageThresholdValue: bytesToGB("10737418240") },
          { usageThresholdID: 2003, usageThresholdSource: 3, usageThresholdValue: bytesToGB("2147483648") },
          { usageThresholdID: 2004, usageThresholdSource: 3, usageThresholdValue: bytesToGB("1073741824") },
          { usageThresholdID: 2005, usageThresholdSource: 3, usageThresholdValue: bytesToGB("16106127360") },
          { usageThresholdID: 2006, usageThresholdSource: 3, usageThresholdValue: bytesToGB("53687091200") },
          { usageThresholdID: 2007, usageThresholdSource: 3, usageThresholdValue: bytesToGB("32212254720") },
          { usageThresholdID: 2009, usageThresholdSource: 3, usageThresholdValue: bytesToGB("2199023255552") }
        ]
      }
    ];

    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT counter, description FROM usagecounters');
      mockData = mockData.map(item => ({
        ...item,
        description: rows.find(row => row.counter === item.usageCounterID)?.description || 'Description non disponible',
        usageThresholdInformation: item.usageThresholdInformation.map(threshold => ({
          ...threshold
        }))
      }));
      connection.release();
      return mockData;
    } catch (err) {
      console.error('❌ Erreur MySQL en mode mock:', err.message);
      throw err;
    }
  }

  const xml = `<?xml version='1.0'?>
<methodCall>
  <methodName>GetUsageThresholdsAndCounters</methodName>
  <params>
    <param>
      <value>
        <struct>
          <member>
            <name>originTransactionID</name>
            <value><string>32</string></value>
          </member>
          <member>
            <name>originTimeStamp</name>
            <value><dateTime.iso8601>${new Date().toISOString()}</dateTime.iso8601></value>
          </member>
          <member>
            <name>originHostName</name>
            <value><string>INTEAM</string></value>
          </member>
          <member>
            <name>originNodeType</name>
            <value><string>EXT</string></value>
          </member>
          <member>
            <name>subscriberNumber</name>
            <value><string>216${msisdn}</string></value>
          </member>
          <member>
            <name>subscriberNumberNAI</name>
            <value><i4>1</i4></value>
          </member>
        </struct>
      </value>
    </param>
  </params>
</methodCall>`;

  try {
    const response = await sendAirRequest(xml);
    const parsed = response;
    const members = parsed.methodResponse.params.param.value.struct.member;

    const usageInfo = members.find(m => m.name === 'usageCounterUsageThresholdInformation');
    if (!usageInfo || !usageInfo.value?.array?.data?.value) {
      console.warn('Aucune donnée de seuils et compteurs trouvée dans la réponse.');
      return [];
    }

    const usageData = usageInfo.value.array.data.value;
    const result = Array.isArray(usageData) ? usageData : [usageData];

    const thresholdsAndCounters = result.map(item => {
      const m = item.struct.member;
      const getVal = (key) => m.find(el => el.name === key)?.value;

      const thresholdsArray = getVal('usageThresholdInformation')?.array?.data?.value || [];
      const thresholds = Array.isArray(thresholdsArray) ? thresholdsArray : [thresholdsArray];
      const thresholdDetails = thresholds.map(t => {
        const tm = t.struct.member;
        return {
          usageThresholdID: parseInt(tm.find(el => el.name === 'usageThresholdID')?.value?.i4 || 0),
          usageThresholdSource: parseInt(tm.find(el => el.name === 'usageThresholdSource')?.value?.i4 || 0),
          usageThresholdValue: bytesToGB(tm.find(el => el.name === 'usageThresholdValue')?.value?.string || '0')
        };
      });

      return {
        usageCounterID: parseInt(getVal('usageCounterID')?.value?.i4 || 0),
        usageCounterValue: getVal('usageCounterValue')?.value?.string || '0',
        usageThresholdInformation: thresholdDetails
      };
    });

    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT counter, description FROM usagecounters');
      const enrichedData = thresholdsAndCounters.map(item => ({
        ...item,
        description: rows.find(row => row.counter === item.usageCounterID)?.description || 'Description non disponible',
        usageThresholdInformation: item.usageThresholdInformation
      }));
      connection.release();
      return enrichedData;
    } catch (err) {
      console.error('❌ Erreur MySQL en mode réel:', err.message);
      return thresholdsAndCounters; // Return data without enrichment if MySQL fails
    }

  } catch (err) {
    console.error("❌ Erreur getUsageThresholdsAndCounters:", err.message);
    if (err.response && err.response.status === 411) {
      console.error("Erreur 411 : Vérifiez la configuration réseau ou les en-têtes.");
    }
    return [];
  }
}
export async function getAccountDetails(msisdn) {
  console.log(`🔁 getAccountDetails pour ${msisdn}`);

  if (IS_DEV) {
    console.log('🧪 Mode mock activé');
    return {
      activationDate: "2022-04-27T12:00:00+0000",
      creditClearanceDate: "2040-09-25T12:00:00+0000",
      masterAccountNumber: msisdn,
      serviceClassCurrent: 104,
      serviceRemovalDate: "2040-09-25T12:00:00+0000",
      supervisionExpiryDate: "2037-12-31T12:00:00+0000",
      ussdEndOfCallNotificationID: 1,
      offers: [
        {
          offerID: 4990,
          expiryDate: "9999-12-31T00:00:00+1200",
          startDate: "2023-09-18T12:00:00+0000",
          description: "Offre Premium Illimitée"
        }
      ],
      communityIDs: [4288]
    };
  }

  const xml = `<?xml version='1.0'?>
  <methodCall>
    <methodName>GetAccountDetails</methodName>
    <params>
      <param>
        <value>
          <struct>
            <member>
              <name>originTransactionID</name>
              <value><string>12345</string></value>
            </member>
            <member>
              <name>originHostName</name>
              <value><string>INTEAM</string></value>
            </member>
            <member>
              <name>originNodeType</name>
              <value><string>EXT</string></value>
            </member>
            <member>
              <name>originTimeStamp</name>
              <value><dateTime.iso8601>${new Date().toISOString()}</dateTime.iso8601></value>
            </member>
            <member>
              <name>subscriberNumber</name>
              <value><string>${msisdn}</string></value>
            </member>
            <member>
              <name>subscriberNumberNAI</name>
              <value><i4>1</i4></value>
            </member>
          </struct>
        </value>
      </param>
    </params>
  </methodCall>`;

  try {
    const response = await axios.post(AIR_URL, xml, {
      headers: {
        'Content-Type': 'text/xml',
        'Authorization': AIR_AUTH,
        'User-Agent': 'UGw Server/4.3/1.0'
      }
    });
    const parsed = await parseStringPromise(response.data, { explicitArray: false });

    const members = parsed?.methodResponse?.params?.param?.value?.struct?.member || [];
    const obj = members.reduce((acc, m) => {
      acc[m.name] = m.value;
      return acc;
    }, {});

    const offerArray = obj.offerInformationList?.array?.data?.value || [];
    const offers = Array.isArray(offerArray)
      ? offerArray.map(v => {
          const members = v.struct.member.reduce((acc, m) => {
            acc[m.name] = m.value?.i4 || m.value?.["dateTime.iso8601"];
            return acc;
          }, {});
          return members;
        })
      : [];

    const communityArray = obj.communityInformationCurrent?.array?.data?.value || [];
    const communityIDs = Array.isArray(communityArray)
      ? communityArray.map(v => v.struct.member.find(m => m.name === 'communityID')?.value?.i4 || null).filter(id => id !== null)
      : [];

    return {
      activationDate: obj.activationDate?.["dateTime.iso8601"],
      creditClearanceDate: obj.creditClearanceDate?.["dateTime.iso8601"],
      masterAccountNumber: obj.masterAccountNumber?.string,
      serviceClassCurrent: obj.serviceClassCurrent?.i4,
      serviceRemovalDate: obj.serviceRemovalDate?.["dateTime.iso8601"],
      supervisionExpiryDate: obj.supervisionExpiryDate?.["dateTime.iso8601"],
      ussdEndOfCallNotificationID: obj.ussdEndOfCallNotificationID?.i4,
      offers,
      communityIDs
    };
  } catch (error) {
    console.error("❌ Erreur SOAP :", error.message);
    return null;
  }
}

export async function getBalanceAndDate(msisdn) {
  console.log(`🔁 getBalanceAndDate pour ${msisdn}`);

  if (IS_DEV) {
    console.log("🧪 Mock getBalanceAndDate pour", msisdn);
    return {
      accountValue1: { string: "250" },
      creditClearanceDate: { "dateTime.iso8601": "20400925T12:00:00+0000" },
      currency1: { string: "TND" },
      serviceClassCurrent: { i4: 104 },
      serviceRemovalDate: { "dateTime.iso8601": "20400925T12:00:00+0000" },
      supervisionExpiryDate: { "dateTime.iso8601": "20371231T12:00:00+0000" },
      dedicatedAccountInformation: {
        array: {
          data: {
            value: [
              {
                struct: {
                  dedicatedAccountID: { i4: 1 },
                  dedicatedAccountValue1: { string: "70000" },
                  expiryDate: { "dateTime.iso8601": "20250831T12:00:00+0000" },
                  description: "Compte Data Principal" // Valeur mockée
                }
              },
              {
                struct: {
                  dedicatedAccountID: { i4: 2 },
                  dedicatedAccountValue1: { string: "48023" },
                  expiryDate: { "dateTime.iso8601": "20250731T12:00:00+0000" },
                  description: "Compte Bonus" // Valeur mockée
                }
              }
            ]
          }
        }
      }
    };
  }

  const xml = `
  <?xml version="1.0"?>
  <methodCall>
    <methodName>GetBalanceAndDate</methodName>
    <params>
      <param>
        <value>
          <struct>
            <member>
              <name>originTransactionID</name>
              <value><string>32</string></value>
            </member>
            <member>
              <name>originHostName</name>
              <value><string>INTEAM</string></value>
            </member>
            <member>
              <name>originNodeType</name>
              <value><string>EXT</string></value>
            </member>
            <member>
              <name>originTimeStamp</name>
              <value><dateTime.iso8601>${new Date().toISOString()}</dateTime.iso8601></value>
            </member>
            <member>
              <name>subscriberNumber</name>
              <value><string>216${msisdn}</string></value>
            </member>
            <member>
              <name>subscriberNumberNAI</name>
              <value><i4>1</i4></value>
            </member>
          </struct>
        </value>
      </param>
    </params>
  </methodCall>
  `;

  try {
    const response = await sendAirRequest(xml);
    const parsed = parseXml(response);

    // Ajout des descriptions pour dedicatedAccountInformation depuis la base de données
    const pool = await connectToDatabase();
    let connection;
    try {
      connection = await pool.getConnection();
      if (parsed.dedicatedAccountInformation?.array?.data?.value) {
        parsed.dedicatedAccountInformation.array.data.value = await Promise.all(
          parsed.dedicatedAccountInformation.array.data.value.map(async (da) => {
            const daId = da?.struct?.dedicatedAccountID?.i4;
            let description = 'Description non disponible';
            if (daId) {
              const [rows] = await connection.execute(
                'SELECT description FROM dagroups WHERE DEDICATED_ACCOUNT_ID = ? LIMIT 1',
                [daId]
              );
              description = rows[0]?.description || description;
            }
            return {
              ...da,
              struct: {
                ...da.struct,
                description
              }
            };
          })
        );
      }
    } finally {
      if (connection) connection.release();
    }

    return parsed;
  } catch (error) {
    console.error("❌ Erreur getBalanceAndDate :", error.message);
    return null;
}}

export async function getFaFList(msisdn) {
  console.log(`🔁 getFaFList pour ${msisdn}`);

  let pool;
  try {
    pool = await connectToDatabase();
  } catch (err) {
    console.error('❌ Erreur lors de la connexion à la base de données:', err.message);
    throw new Error('Erreur de connexion à la base de données');
  }

  if (IS_DEV) {
    console.log('🧪 Mode mock activé');
    let mockData = [
      { fafIndicator: 100, fafNumber: '50011210', owner: 'Subscriber' },
      { fafIndicator: 100, fafNumber: '52988554', owner: 'Subscriber' }
    ];

    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT fafindicator, description FROM faf');
      mockData = mockData.map(item => ({
        ...item,
        description: rows.find(row => row.fafindicator === item.fafIndicator)?.description || 'Description non disponible'
      }));
      connection.release();
    } catch (err) {
      console.error('❌ Erreur MySQL en mode mock:', err.message);
      throw err;
    }

    return mockData;
  }

  const xml = `<?xml version="1.0"?>
<methodCall>
  <methodName>GetFaFList</methodName>
  <params>
    <param>
      <value>
        <struct>
          <member>
            <name>originTransactionID</name>
            <value><string>32</string></value>
          </member>
          <member>
            <name>originHostName</name>
            <value><string>INTEAM</string></value>
          </member>
          <member>
            <name>originNodeType</name>
            <value><string>EXT</string></value>
          </member>
          <member>
            <name>originTimeStamp</name>
            <value><dateTime.iso8601>${new Date().toISOString()}</dateTime.iso8601></value>
          </member>
          <member>
            <name>subscriberNumber</name>
            <value><string>216${msisdn}</string></value>
          </member>
          <member>
            <name>requestedOwner</name>
            <value><i4>1</i4></value>
          </member>
          <member>
            <name>subscriberNumberNAI</name>
            <value><i4>1</i4></value>
          </member>
        </struct>
      </value>
    </param>
  </params>
</methodCall>`;

  try {
    const response = await axios.post(AIR_URL, xml, {
      headers: {
        'Content-Type': 'text/xml',
        'Accept': 'text/xml',
        'Authorization': AIR_AUTH,
        'User-Agent': 'UGw Server/4.3/1.0'
      },
      timeout: 60000
    });

    const parsed = await parseStringPromise(response.data, { explicitArray: false });
    const members = parsed.methodResponse.params.param.value.struct.member;

    const fafInfo = members.find(m => m.name === 'fafInformationList');
    if (!fafInfo || !fafInfo.value?.array?.data?.value) {
      console.warn('Aucune donnée FAF trouvée dans la réponse.');
      return [];
    }

    const fafData = fafInfo.value.array.data.value;
    const result = Array.isArray(fafData) ? fafData : [fafData];

    const faFList = await Promise.all(result.map(async (item) => {
      const m = item.struct.member;
      const getVal = (key) => m.find(el => el.name === key)?.value;

      const fafIndicator = parseInt(getVal('fafIndicator')?.i4 || 0);
      const fafNumber = getVal('fafNumber')?.string;
      const owner = getVal('owner')?.string;

      const connection = await pool.getConnection();
      try {
        const [rows] = await connection.execute('SELECT description FROM faf WHERE fafindicator = ? LIMIT 1', [fafIndicator]);
        return {
          fafIndicator,
          fafNumber,
          owner,
          description: rows[0]?.description || 'Description non disponible'
        };
      } finally {
        connection.release();
      }
    }));

    return faFList;
  } catch (error) {
    console.error('❌ Erreur dans getFaFList:', error.message);
    if (error.response && error.response.status === 411) {
      console.error('Erreur 411 : Vérifiez la configuration réseau ou les en-têtes.');
    }
    return null;
  }
}

export async function getAccumulators(msisdn) {
  console.log(`🔁 getAccumulators pour ${msisdn}`);

  if (IS_DEV) {
    return [
      {
        accumulatorID: 11,
        value: 950,
        startDate: "20250701T12:00:00+0000",
        resetDate: "20250801T12:00:00+0000",
        description: "Tracking Usage multiplie par 100"
      },
      {
        accumulatorID: 20,
        value: 0,
        startDate: "20250701T12:00:00+0000",
        resetDate: "20250801T12:00:00+0000",
        description: "Status SMS recurring"
      }
    ];
  }

  const xml = `<?xml version="1.0"?>
<methodCall>
  <methodName>GetAccumulators</methodName>
  <params>
    <param>
      <value>
        <struct>
          <member>
            <name>originTransactionID</name>
            <value><string>12345</string></value>
          </member>
          <member>
            <name>originTimeStamp</name>
            <value><dateTime.iso8601>${new Date().toISOString()}</dateTime.iso8601></value>
          </member>
          <member>
            <name>originHostName</name>
            <value><string>INTEAM</string></value>
          </member>
          <member>
            <name>originNodeType</name>
            <value><string>EXT</string></value>
          </member>
          <member>
            <name>subscriberNumber</name>
            <value><string>216${msisdn}</string></value>
          </member>
          <member>
            <name>subscriberNumberNAI</name>
            <value><i4>1</i4></value>
          </member>
        </struct>
      </value>
    </param>
  </params>
</methodCall>`;

  try {
    const response = await axios.post(AIR_URL, xml, {
      headers: {
        'Content-Type': 'text/xml',
        'Authorization': AIR_AUTH,
        'User-Agent': 'UGw Server/4.3/1.0'
      }
    });

    const parsed = await parseStringPromise(response.data, { explicitArray: false });
    const members = parsed.methodResponse.params.param.value.struct.member;

    const accumulatorInfo = members.find(m => m.name === 'accumulatorInformation');
    if (!accumulatorInfo || !accumulatorInfo.value?.array?.data?.value) {
      console.warn('Aucune donnée d\'accumulateur trouvée dans la réponse.');
      return [];
    }

    const accumData = accumulatorInfo.value.array.data.value;
    const result = Array.isArray(accumData) ? accumData : [accumData];

    // ✅ Récupération des descriptions depuis la table uagroup
    const pool = await connectToDatabase();
    let uaDescriptions = {};
    try {
      const [rows] = await pool.query(`SELECT ua, description FROM uagroup`);
      rows.forEach(r => {
        uaDescriptions[r.ua] = r.description;
      });
    } catch (e) {
      console.error("⚠️ Erreur récupération descriptions UA:", e.message);
    } finally {
      pool.releaseConnection && pool.releaseConnection();
    }

    return result.map(item => {
      const m = item.struct.member;
      const getVal = (key) => m.find(el => el.name === key)?.value;

      const accId = parseInt(getVal('accumulatorID')?.i4 || 0);
      return {
        accumulatorID: accId,
        value: parseInt(getVal('accumulatorValue')?.i4 || 0),
        startDate: getVal('accumulatorStartDate')?.['dateTime.iso8601'],
        resetDate: getVal('accumulatorEndDate')?.['dateTime.iso8601'] || null,
        description: uaDescriptions[accId] || "Description non disponible"
      };
    });
  } catch (err) {
    console.error("❌ Erreur getAccumulators:", err.message);
    if (err.response && err.response.status === 411) {
      console.error("Erreur 411 : Vérifiez la configuration réseau ou les en-têtes.");
    }
    return null;
  }
}


export async function getMsisdnInformation(msisdn) {
  console.log(`🔁 Récupération des informations pour MSISDN ${msisdn}`);

  try {
    const accountDetails = await getAccountDetails(msisdn);
    console.log(`🟢 accountDetails récupéré pour ${msisdn}`);

    const [balanceAndDate, faFList, accumulators, usageThresholdsAndCounters] = await Promise.all([
      getBalanceAndDate(msisdn),
      getFaFList(msisdn),
      getAccumulators(msisdn),
      getUsageThresholdsAndCounters(msisdn)
    ]);

    function formatBalance(value) {
      return value ? (parseInt(value.string) / 1000).toFixed(3) + ' DT' : 'N/A';
    }
    function formatDate(isoDateObj) {
      let isoString;

      if (typeof isoDateObj === 'object' && isoDateObj?.["dateTime.iso8601"]) {
        isoString = isoDateObj["dateTime.iso8601"];
      } else if (typeof isoDateObj === 'string') {
        isoString = isoDateObj;
      } else {
        return 'N/A';
      }

      if (!isoString || isoString === "00000000T000000") {
        return "N/A";
      }

      try {
        const match = isoString.match(
          /^(\d{4})(\d{2})(\d{2})T(\d{2}):?(\d{2}):?(\d{2})([+\-]\d{4})?$/
        );

        if (match) {
          const [_, y, m, d, hh, mm, ss, tz] = match;
          const isoFixed = `${y}-${m}-${d}T${hh}:${mm}:${ss}${
            tz ? tz.slice(0, 3) + ":" + tz.slice(3) : ""
          }`;

          const date = new Date(isoFixed);
          if (!isNaN(date.getTime())) {
            return date.toLocaleString("fr-TN", { timeZone: "Africa/Tunis" });
          }
        }

        const date = new Date(isoString);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString("fr-TN", { timeZone: "Africa/Tunis" });
        }

        return "N/A";
      } catch (e) {
        console.error("Date parsing error:", e.message, "for input:", isoString);
        return "N/A";
      }
    }

    // ✅ Connexion DB pour enrichir les descriptions des DA
    const pool = await connectToDatabase();
    let descriptionsMap = {};
    try {
      const sc = accountDetails?.serviceClassCurrent || 0;
      if (sc) {
        const [rows] = await pool.query(
          `SELECT b.DEDICATED_ACCOUNT_ID as da, b.DESCRIPTION as description
           FROM (SELECT * FROM serviceclasses WHERE sc = ?) a,
                (SELECT * FROM dagroups) b
           WHERE a.dagroup = b.DEFINITION_GROUP_ID`,
          [sc]
        );
        rows.forEach(r => {
          descriptionsMap[r.da] = r.description;
        });
      }
    } catch (e) {
      console.error("⚠️ Erreur récupération descriptions DA:", e.message);
    } finally {
      pool.releaseConnection && pool.releaseConnection();
    }

    const transformedBalance = {
      balance: formatBalance(balanceAndDate?.accountValue1),
      currency: balanceAndDate?.currency1?.string || 'TND',
      creditClearanceDate: formatDate(balanceAndDate?.creditClearanceDate),
      supervisionExpiryDate: formatDate(balanceAndDate?.supervisionExpiryDate),
      serviceRemovalDate: formatDate(balanceAndDate?.serviceRemovalDate),
      dedicatedAccounts: (balanceAndDate?.dedicatedAccountInformation?.array?.data?.value || []).map(da => {
        const daId = da?.struct?.dedicatedAccountID?.i4;
        return {
          id: daId,
          value: formatBalance({ string: da?.struct?.dedicatedAccountValue1?.string }),
          expiryDate: formatDate(da?.struct?.expiryDate),
          description: descriptionsMap[daId] || 'Description non disponible'
        };
      })
    };

    const result = {
      accountDetails: accountDetails || {},
      balance: transformedBalance,
      faFList: faFList || [],
      accumulators: accumulators || [],
      usageThresholdsAndCounters: usageThresholdsAndCounters || []
    };

    console.log(`✅ Informations transformées pour ${msisdn}`);
    return result;
  } catch (err) {
    console.error('❌ Erreur dans getMsisdnInformation:', err.message);
    throw err;
  }
}
