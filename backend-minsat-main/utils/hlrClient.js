import Telnet from 'telnet-client';

export async function getHLRStatus(msisdn) {
const IS_DEV = process.env.NODE_ENV === 'development';

    if (IS_DEV) {
    console.log("🧪 Mode mock HLR activé");

    return {
      msisdn,
      odbic: "NOBIC",
      ODBOC : 'NOBOC',
      odbroam: "NOBAR",
      odbss: "FALSE",
      barred: false
    };
  }
  const connection = new Telnet();
  const params = {
    host: '10.23.69.209',
    port: 7776,
    shellPrompt: '',
    timeout: 1500,
    execTimeout: 3000,
    sendTimeout: 1000,
    negotiationMandatory: false,
    debug: false
  };

  const loginCmd = 'LGI:OPNAME="mmlgwin",PWD="Orange@Huawei@2024";';
  const lstCmd = `LST ODBDAT: ISDN="${msisdn}";`;
  try {
    await connection.connect(params);

    await connection.send(loginCmd);
    const result = await connection.send(lstCmd);

    await connection.end();

    // Extraction des champs utiles
    const odbicMatch = result.match(/ODBIC\s*=\s*(\w+)/);
    const ODBOCMatch = result.match(/ODBOC\s*=\s*(\w+)/);
    const odbroamMatch = result.match(/ODBROAM\s*=\s*(\w+)/);
    const odbssMatch = result.match(/ODBSS\s*=\s*(\w+)/);

    const odbic = odbicMatch ? odbicMatch[1] : 'UNKNOWN';
    const ODBOC = ODBOCMatch ? ODBOCMatch[1] : 'UNKNOWN';
    const odbroam = odbroamMatch ? odbroamMatch[1] : 'UNKNOWN';
    const odbss = odbssMatch ? odbssMatch[1] : 'UNKNOWN';

    return {
      msisdn,
      odbic,
      odbroam,
      odbss,
      barred: odbic !== 'NOBIC' || ODBOC !== 'NOBOC' || odbroam !== 'NOBAR' || odbss === 'TRUE'
    };
  } catch (error) {
    console.error('❌ Erreur HLR Telnet:', error.message);
    throw new Error('Erreur HLR Telnet');
  }
}
