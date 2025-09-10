import { resetPasswordMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";

import generateToken from "../utils/generateToken.js";
import {
  findUserByEmail,
  findUserById,
  updateUserPassword
} from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// @desc    forget password
// @route   POST /api/user/forgetpassword
// @access  Public
export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // 🔹 Utiliser await ici
  const users = await findUserByEmail(email);

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const user = users[0];

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const subject = "Réinitialisation du mot de passe";
  const text = `Cliquez ici pour réinitialiser votre mot de passe : ${process.env.FRONT_URL}/resetpassword/${token}`;

  await resetPasswordMail(email, subject, text, token);

  return res.status(200).json({ message: `Email envoyé à ${email}` });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { password, token } = req.body;

    if (!password || !token) {
      return res
        .status(400)
        .json({ message: "Password and token are required" });
    }

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("REQ BODY:", req.body);
    console.log("TOKEN:", token);
    console.log("DECODED:", decoded);

    // Vérifier si l'utilisateur existe
    const users = await findUserById(decoded.id);
    console.log("USERS FOUND:", users);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = users[0];
    // Hasher le mot de passe avant de le stocker
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Mettre à jour en base
    await updateUserPassword(decoded.id, hashedPassword);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
});


