import express from 'express';
import { getVoucherDetails } from '../services/VoucherService.js';

const router = express.Router();

router.get('/:lookup', async (req, res) => {
  const { lookup } = req.params;
  try {
    const voucher = await getVoucherDetails(lookup, 'activationCode');
    res.json({ voucher });
    // ou bien : res.render('activationcode', { voucher });
  } catch (err) {
    console.error('❌ Erreur dans GET /activationcode/:lookup:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

export default router;
