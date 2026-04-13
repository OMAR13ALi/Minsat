package com.minsat.password;

import com.minsat.auth.UserRepository;
import com.minsat.mail.MailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.reset-expiration-hours}")
    private int resetExpirationHours;

    public PasswordResetService(UserRepository userRepository,
                                MailService mailService,
                                PasswordEncoder passwordEncoder) {
        this.userRepository  = userRepository;
        this.mailService     = mailService;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> forgotPassword(String email) {
        // Always return 200 to prevent email enumeration
        userRepository.findByEmail(email).ifPresent(user -> {
            String token = UUID.randomUUID().toString();
            LocalDateTime expiry = LocalDateTime.now().plusHours(resetExpirationHours);
            userRepository.saveResetToken(user.id(), token, expiry);
            mailService.sendPasswordResetMail(email, token);
        });
        return Map.of("message", "Si un compte existe pour cet email, un lien de réinitialisation a été envoyé.");
    }

    public Map<String, Object> resetPassword(String token, String newPassword) {
        var user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new InvalidTokenException("Lien de réinitialisation invalide."));

        if (user.resetTokenExpiry() == null || LocalDateTime.now().isAfter(user.resetTokenExpiry())) {
            throw new InvalidTokenException("Ce lien a expiré. Veuillez faire une nouvelle demande.");
        }

        userRepository.updatePassword(user.id(), passwordEncoder.encode(newPassword));
        userRepository.clearResetToken(user.id());
        return Map.of("message", "Mot de passe mis à jour avec succès.");
    }

    public static class InvalidTokenException extends RuntimeException {
        public InvalidTokenException(String m) { super(m); }
    }
}
