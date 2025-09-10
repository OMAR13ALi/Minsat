import { getVoucherDetails } from '../services/VoucherService.js';
import express from 'express';

const router = express.Router();
//serialnumber route
router.get('/serialNumber/:lookup', async (req, res) => {
  const { lookup } = req.params;
  try {
    // Par défaut on utilise le lookup comme un serialNumber
    const voucher = await getVoucherDetails(lookup, 'serialNumber');

    res.json({ voucher, user: req.session });
  } catch (err) {
    console.error('❌ Erreur dans GET /:lookup:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});
//activationCode route
export default router;
