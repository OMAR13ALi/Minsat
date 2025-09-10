import bcrypt from 'bcryptjs';
import { sendAccountApprovedMail } from '../utils/sendMail.js';
import generateToken from '../utils/generateToken.js';
import {
  createUser,
  findUserByEmail, 
  updateLoginDate,
  deactivateUser,
  validateUser,
  getAllUsers
} from '../models/User.js';
import vaultClient from '../utils/vaultClient.js';
import 'dotenv/config'; 
const getAdminCredentials = async () => {
  try {
    const result = await vaultClient.read('secret/myapp/minsat');
    const { mail_user, mail_pass } = result.data.data; // 🔁 adapter les clés si besoin
    return { email: mail_user, password: mail_pass };
  } catch (error) {
    console.error('Erreur lors de la lecture du secret Vault :', error);
    return null;
  }
};

export const register = async (req, res) => {
  const { username, email, password, class: userClass } = req.body;
  console.log('🔍 Requête reçue:', { username, email, userClass });

  if (!username || !email || !password || !userClass) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const users = await findUserByEmail(email);
    if (users.length > 0) {
      return res.status(409).json({ message: 'Email déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vaultPath = `secret/data/myapp/users/${email}`;
    await vaultClient.write(vaultPath, {
      data: { password: hashedPassword },
    });

    await createUser(username, email, userClass);
    return res.status(201).json({ message: 'Inscription réussie. En attente de validation.' });

  } catch (error) {
    console.error('❌ Erreur dans register:', error.message);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Tentative de login pour:', email);

  try {
    const users = await findUserByEmail(email);
    
    if (!users || users.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = users[0];

    // Vérifier si c’est l’admin depuis Vault
    const credentials = await getAdminCredentials();
    if (credentials) {
      const { email: adminEmail, password: adminPassword } = credentials;
      if (email.trim() === adminEmail.trim()) {
        if (password !== adminPassword) {
          return res.status(401).json({ message: 'Mot de passe incorrect (admin).' });
        }

        const token = generateToken(user.id);
        return res.status(200).json({
          message: 'Connexion admin (via Vault).',
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            class: user.class,
            status: user.status,
          },
        });
      }
    }

    // Vérifier si le compte est actif
    if (user.status === 0) {
      return res.status(403).json({
        message: 'Votre compte n’a pas encore été activé par l’administrateur.',
      });
    }

    // Lire le mot de passe hashé depuis Vault
    const vaultUserPath = `secret/data/myapp/users/${user.email}`;
    let userSecret;
    try {
      userSecret = await vaultClient.read(vaultUserPath);
    } catch (vaultError) {
      console.error('❌ Erreur lecture Vault:', vaultError);
      return res.status(500).json({ message: 'Erreur Vault.' });
    }

    const hashedPassword = userSecret.data.data.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Vérifier inactivité (30 jours)
    const now = new Date();
    const lastLogin = user.login_at ? new Date(user.login_at) : null;

    if (lastLogin && (now - lastLogin) / (1000 * 60 * 60 * 24) > 30) {
      await deactivateUser(user.id);
      return res.status(403).json({
        message: 'Compte désactivé après 30 jours d’inactivité.',
      });
    }

    // Mettre à jour la date de login
    await updateLoginDate(user.id, now);

    const token = generateToken(user.id);
    return res.status(200).json({
      message: 'Connexion réussie.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        class: user.class,
        status: user.status,
      },
    });
  } catch (err) {
    console.error('❌ Erreur dans login:', err);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const validateByAdmin = async (req, res) => {
  const { correctClass, email, name } = req.body;

  // ✅ On vérifie seulement les champs nécessaires
  if (!correctClass || !email || !name) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const validClasses = ['IN', 'DSC', 'DFI', 'Admin'];
  if (!validClasses.includes(correctClass)) {
    return res.status(400).json({ message: 'Rôle invalide.' });
  }

  try {
    const users = await findUserByEmail(email);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = users[0]; // ✅ Récupération depuis la BDD

    let newStatus = {
      'IN': 3,
      'DSC': 2,
      'DFI': 1,
      'Admin': 4
    }[correctClass];

    // ✅ On utilise l'ID récupéré depuis la base
    await validateUser(user.id, correctClass, newStatus);
    await sendAccountApprovedMail(email, name);

    return res.status(200).json({
      message: `Utilisateur ${name} validé avec le rôle ${correctClass} et email envoyé.`
    });
  } catch (error) {
    console.error('❌ Erreur dans validateByAdmin:', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};


export const getAllUser = async (req, res) => {
  console.log('🔍 Récupération de la liste de tous les utilisateurs', { url: req.url, method: req.method });

  try {
    const users = await getAllUsers(); // Appel au modèle
    console.log('🗄️ Utilisateurs bruts:', users);

    const sanitizedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      class: user.class,
      status: user.status,
      login_at: user.login_at ? new Date(user.login_at).toLocaleString('fr-TN', { timeZone: 'Africa/Tunis' }) : null
    }));

    if (sanitizedUsers.length === 0) {
      console.log('⚠️ Aucun utilisateur trouvé');
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }

    console.log(`✅ Liste des utilisateurs récupérée (${sanitizedUsers.length} utilisateurs)`);
    return res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.error('❌ Erreur dans getAllUsers:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs.' });
  }
};