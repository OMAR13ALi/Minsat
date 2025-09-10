import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { findUserById } from "../models/User.js"; // adapte le chemin

// Middleware d'authentification
export const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Promisify la fonction findUserById (qui est en callback)
      const user = await new Promise((resolve, reject) => {
        findUserById(decoded.id, (err, users) => {
          if (err) return reject(err);
          if (!users || users.length === 0) return reject(new Error("Utilisateur non trouvé."));
          resolve(users[0]);
        });
      });

      req.user = user; // on attache l'utilisateur trouvé
      next();
    } catch (err) {
      console.error("Erreur JWT ou recherche utilisateur:", err.message);
      res.status(401);
      throw new Error("Token invalide ou utilisateur non trouvé.");
    }
  } else {
    res.status(401);
    throw new Error("Non autorisé, token manquant.");
  }
});

// Middleware pour vérifier le rôle ADMIN
export const Admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.class === "ADMIN") {
    return next();
  } else {
    res.status(403);
    throw new Error("Accès réservé à l’administrateur.");
  }
});


// Middleware pour agentss IN
export const AgentIN = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.class === "IN") {
    next();
  } else {
    res.status(403);
    throw new Error("Accès réservé à un agent IN.");
  }
});

// Middleware pour agent DFI
export const AgentDFI = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.class === "DFI") {
    next();
  } else {
    res.status(403);
    throw new Error("Accès réservé à un agent DFI.");
  }
});

// Middleware pour agent DSC
export const AgentDSC = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.class === "DSC") {
    next();
  } else {
    res.status(403);
    throw new Error("Accès réservé à un agent DSC.");
  }
});
