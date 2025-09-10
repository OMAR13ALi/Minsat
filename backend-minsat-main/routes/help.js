import express from 'express';
import { getServiceClassController
    ,uagroupController,
    serviceidentifierController,
    offerController,
    usagecountersController
 } from '../controllers/help.js';

const router = express.Router();
router.get("/sc",getServiceClassController) ;
router.get("/ua",uagroupController);
router.get("/si",serviceidentifierController);
router.get("/offer",offerController);
router.get("/uc",usagecountersController);

export default router;  
