import { createTransport } from "nodemailer";

export const sendAccountApprovedMail = async (email, agentName) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const subject = "Activation de votre compte Orange - MINSAT";
    const text = `Bonjour ${agentName}, votre compte a été validé avec succès par l'administrateur. Vous pouvez désormais vous connecter à la plateforme.`;

    const html = `
    <html>
      <body>
        <div style="background-color: #ffffffff; color: black; padding: 20px; font-family: sans-serif; border-radius: 12px; text-align: center;">
          <h1 style="margin-bottom: 10px;">${subject}</h1>
          <p>Bonjour <strong>${agentName}</strong>,</p>
          <p>Nous vous informons que votre compte a été <strong>activé avec succès</strong> par notre équipe administrative.</p>
          <p>Vous pouvez maintenant vous connecter et accéder aux services de la plateforme <strong>MINSAT</strong>.</p>
          <a href="${process.env.FRONT_URL}/login" style="display:inline-block; margin-top: 20px; padding: 10px 20px; background-color: white; color: #fa9112ff; border-radius: 8px; text-decoration: none;">Se connecter</a>
          <p style="margin-top: 30px; font-size: 12px;">Si vous n'êtes pas à l'origine de cette inscription, merci d'ignorer cet e-mail.</p>
          <hr style="margin: 20px auto; border-top: 1px solid #fff; width: 80%;">
          <p style="font-size: 10px;">&copy; 2025 MINSAT Orange Tunisie. Tous droits réservés.</p>
        </div>
      </body>
    </html>`;

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      text,
      html,
    });

    console.log("✅ Email de confirmation envoyé :", info.messageId);
    return { status: 200 };
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
    return error;
  }
};
export const resetPasswordMail = async (email, subject, text, token) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      text: text,
      html: `<html>
          <head>
          </head>
          <body>
              <div class="topper" style="
                          background-color: #ff8c20ff;
                          width: 100%;
                          height: 100%;
                          color: Black;
                          font-family: sans-serif;
                          padding: 5px;
                          border-radius: 12px;
                          text-align: center;">
                  <h1 style="padding: 5px 0px 0px 0px ; color:#fff">${subject}</h1>
                  <p style="padding: 0px 0px 10px 0px;">
                  réinitialisez votre mot de passe</p>
                  <a href=${process.env.FRONT_URL}/resetpassword/${token} style="color: Black; padding: 10px 10px 10px 10px; border:1px solid white; border-radius:16px; cursor: pointer; text-decoration: none;">
                  Reset
                  </a>
                  <p style="padding: 0px 0px 10px 0px;">
                  ${text}</p>
              <hr style="border-top: 1px solid #fff; border-left: 0px, marginTop:5px">
          </div>
          </body>
          </html>`,
    });
    console.log("✅ Email envoyé :", info.messageId);

    return { status: 200 };
  } catch (error) {
    return error;
  }
};



