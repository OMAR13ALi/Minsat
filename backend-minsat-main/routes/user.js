import express from 'express';
import { register, login, validateByAdmin,getAllUser } from '../controllers/user.js';
import { forgetPassword,resetPassword } from '../controllers/resetpass.js';
import {auth,Admin} from '../middlewares/permission.js'
const router = express.Router();

router.get('/all', getAllUser);
router.post('/login', login);

/**
 * @route   POST /api/users/register
 * @desc    Inscription d’un agent
 */
router.post('/register', register);

/**
 * @route   POST /api/users/login
 * @desc    Connexion d’un utilisateur
 */
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword",resetPassword );

/**
 * @route   POST /api/users/
 * @desc    Validation d’un agent par l’admin
 */
router.post('/validate',validateByAdmin);


export default router; 