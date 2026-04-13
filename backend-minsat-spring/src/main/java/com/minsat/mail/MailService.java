package com.minsat.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromAddress;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /** Notify admin that a new account awaits validation. */
    @Async
    public void sendAdminNotificationMail(String adminEmail, String newUsername, String newEmail) {
        String subject = "Nouvelle inscription en attente — MINSAT";
        String body = String.format(
                "<p>Un nouvel utilisateur <strong>%s</strong> (%s) a demandé un accès.<br>" +
                "Veuillez valider son compte depuis le panneau d'administration.</p>",
                newUsername, newEmail);
        send(adminEmail, subject, body);
    }

    /** Notify user that their account has been approved. */
    @Async
    public void sendAccountApprovedMail(String toEmail, String agentName) {
        String subject = "Activation de votre compte Orange — MINSAT";
        String loginUrl = frontendUrl + "/login";
        String body = String.format("""
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
                  <div style="background:#ff6600;padding:20px;text-align:center">
                    <h1 style="color:#fff;margin:0">MINSAT</h1>
                  </div>
                  <div style="padding:30px;background:#fff">
                    <h2 style="color:#ff6600">Bienvenue, %s !</h2>
                    <p>Votre compte a été activé par l'administrateur. Vous pouvez maintenant vous connecter.</p>
                    <div style="text-align:center;margin:30px 0">
                      <a href="%s" style="background:#ff6600;color:#fff;padding:12px 30px;
                         border-radius:5px;text-decoration:none;font-weight:bold">
                        Se connecter
                      </a>
                    </div>
                    <p style="color:#666;font-size:12px">Si vous n'avez pas demandé ce compte, ignorez cet email.</p>
                  </div>
                </div>
                """, agentName, loginUrl);
        send(toEmail, subject, body);
    }

    /** Send password reset email with a time-limited link. */
    @Async
    public void sendPasswordResetMail(String toEmail, String token) {
        String subject = "Réinitialisation du mot de passe — MINSAT";
        String resetUrl = frontendUrl + "/resetpassword/" + token;
        String body = String.format("""
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
                  <div style="background:#ff6600;padding:20px;text-align:center">
                    <h1 style="color:#fff;margin:0">MINSAT</h1>
                  </div>
                  <div style="padding:30px;background:#fff">
                    <h2 style="color:#333">Réinitialisation du mot de passe</h2>
                    <p>Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe.<br>
                       Ce lien est valable <strong>1 heure</strong>.</p>
                    <div style="text-align:center;margin:30px 0">
                      <a href="%s" style="background:#ff6600;color:#fff;padding:12px 30px;
                         border-radius:5px;text-decoration:none;font-weight:bold">
                        Réinitialiser le mot de passe
                      </a>
                    </div>
                    <p style="color:#666;font-size:12px">Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
                  </div>
                </div>
                """, resetUrl);
        send(toEmail, subject, body);
    }

    private void send(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromAddress);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info("Email sent to {}: {}", to, subject);
        } catch (MessagingException e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }
}
