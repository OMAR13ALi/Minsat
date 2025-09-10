import express from 'express';
import { getAccountDetails, getMsisdnInformation,getBalanceAndDate, getFaFList,getAccumulators,getUsageThresholdsAndCounters  } from '../services/GetMSISDNService.js';
const router = express.Router();
import { getHLRStatus } from '../utils/hlrClient.js';

router.get('/account-details/:msisdn', async (req, res) => {
  const { msisdn } = req.params;

  try {
    const data = await getAccountDetails(msisdn);

    if (!data) {
      return res.status(500).json({ message: "Erreur lors de la récupération des détails du compte." });
    }
    // Formater le msisdn pour s'assurer qu'il commence par "216"
    const formattedMsisdn = msisdn.startsWith('216') ? msisdn : `216${msisdn}`;

    res.json({
      msisdn: formattedMsisdn,
      activationDate: data.activationDate,
      creditClearanceDate: data.creditClearanceDate,
      masterAccountNumber: data.masterAccountNumber || formattedMsisdn,
      serviceClass: data.serviceClassCurrent,
      serviceRemovalDate: data.serviceRemovalDate,
      supervisionExpiryDate: data.supervisionExpiryDate,
      ussdEndOfCallNotificationID: data.ussdEndOfCallNotificationID,
      offerList: data.offers || [],
      communityIDs: data.communityIDs || [] 
    });

  } catch (error) {
    console.error("❌ Erreur dans la route Express :", error.message);
    res.status(500).json({ message: "Erreur serveur interne." });
  }
});

router.get('/balance-and-date/:msisdn', async (req, res) => {
  const { msisdn } = req.params;

  try {
    const data = await getBalanceAndDate(msisdn);

    if (!data) {
      return res.status(500).json({ message: "Erreur lors de la récupération." });
    }

    const dedicatedAccountsRaw = data.dedicatedAccountInformation?.array?.data?.value || [];
    const dedicatedAccounts = dedicatedAccountsRaw.map(entry => {
      const members = entry.struct?.member || [];
      const get = (key) => members.find(m => m.name === key)?.value;

      return {
        dedicatedAccountActiveValue1: get("dedicatedAccountActiveValue1"),
        dedicatedAccountID: get("dedicatedAccountID"),
        dedicatedAccountUnitType: get("dedicatedAccountUnitType"),
        dedicatedAccountValue1: get("dedicatedAccountValue1")
      };
    });

    res.json({
      serviceClassCurrent: data.serviceClassCurrent,
      serviceFeeExpiryDate: data.serviceFeeExpiryDate,
      serviceRemovalDate: data.serviceRemovalDate,
      supervisionExpiryDate: data.supervisionExpiryDate,
      dedicatedAccounts: dedicatedAccounts
    });

  } catch (error) {
    console.error("❌ Erreur getBalanceAndDate :", error.message);
    res.status(500).json({ message: "Erreur serveur interne." });
  }
});

router.get('/faf-list/:msisdn', async (req, res) => {
  const { msisdn } = req.params;

  try {
    const list = await getFaFList(msisdn);
    res.json({
      msisdn: `216${msisdn}`,
      list
    });
  } catch (error) {
    console.error("❌ Erreur dans la route /faf-list :", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération de la liste FAF." });
  }
});

router.get('/accumulators/:msisdn', async (req, res) => {
  const { msisdn } = req.params;

  try {
    const data = await getAccumulators(msisdn);

    if (!data) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des accumulateurs.' });
    }

    res.json({
      msisdn: `216${msisdn}`,
      accumulators: data,
    });

  } catch (err) {
    console.error('❌ Erreur route /accumulators:', err.message);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
});

router.get('/usage-thresholds/:msisdn', async (req, res) => {
  const { msisdn } = req.params;

  try {
    const data = await getUsageThresholdsAndCounters(msisdn);

    if (!data) {
      return res.status(500).json({ message: "Erreur lors de la récupération des seuils et compteurs." });
    }

    res.json(data);
  } catch (error) {
    console.error("❌ Erreur dans la route /usage-thresholds:", error.message);
    res.status(500).json({ message: "Erreur serveur interne." });
  }
});

router.get('/msisdn/:msisdn', async (req, res) => {
  const { msisdn } = req.params;
  try {
    const info = await getMsisdnInformation(msisdn);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/hlr/:msisdn', async (req, res) => {
  try {
    const data = await getHLRStatus(req.params.msisdn);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
