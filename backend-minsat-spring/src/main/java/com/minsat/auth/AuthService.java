package com.minsat.auth;

import com.minsat.mail.MailService;
import com.minsat.security.JwtTokenProvider;
import com.minsat.vault.VaultSecretService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final VaultSecretService vaultSecretService;

    public AuthService(UserRepository userRepository,
                       JwtTokenProvider jwtTokenProvider,
                       PasswordEncoder passwordEncoder,
                       MailService mailService,
                       VaultSecretService vaultSecretService) {
        this.userRepository    = userRepository;
        this.jwtTokenProvider  = jwtTokenProvider;
        this.passwordEncoder   = passwordEncoder;
        this.mailService       = mailService;
        this.vaultSecretService = vaultSecretService;
    }

    public Map<String, Object> register(RegisterRequest req) {
        if (userRepository.findByEmail(req.email()).isPresent()) {
            throw new ConflictException("Un compte existe déjà avec cet email.");
        }
        String hashed = passwordEncoder.encode(req.password());
        userRepository.insert(req.username(), req.email(), hashed,
                req.userClass() != null ? req.userClass() : "DFI");

        // Notify admin
        String adminEmail = vaultSecretService.getAdminEmail();
        if (adminEmail != null && !adminEmail.isBlank()) {
            mailService.sendAdminNotificationMail(adminEmail, req.username(), req.email());
        }
        return Map.of("message", "Inscription réussie. En attente de validation par l'administrateur.");
    }

    public Map<String, Object> login(LoginRequest req) {
        String email = req.email().trim();

        // ── Admin Vault path (plaintext compare, no bcrypt, no status check) ──
        String adminEmail = vaultSecretService.getAdminEmail();
        if (adminEmail != null && adminEmail.equalsIgnoreCase(email)) {
            String adminPass = vaultSecretService.getAdminPassword();
            if (!req.password().equals(adminPass)) {
                throw new UnauthorizedException("Identifiants incorrects.");
            }
            // Issue ADMIN token — use id=0 as a sentinel for the Vault admin
            String token = jwtTokenProvider.generateToken(0, "ADMIN");
            return buildLoginResponse(token, 0, adminEmail, adminEmail, "ADMIN", 4);
        }

        // ── Regular user path ──
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Identifiants incorrects."));

        if (user.status() == 0) {
            throw new ForbiddenException("Votre compte n'a pas encore été activé.");
        }

        if (user.password() == null) {
            throw new ForbiddenException("Compte migré — veuillez réinitialiser votre mot de passe via 'Mot de passe oublié'.");
        }

        if (!passwordEncoder.matches(req.password(), user.password())) {
            throw new UnauthorizedException("Identifiants incorrects.");
        }

        // 30-day inactivity check
        if (user.loginAt() != null && ChronoUnit.DAYS.between(user.loginAt(), LocalDateTime.now()) > 30) {
            userRepository.setStatus(user.id(), 0);
            throw new ForbiddenException("Compte désactivé après 30 jours d'inactivité. Contactez l'administrateur.");
        }

        userRepository.updateLoginAt(user.id(), LocalDateTime.now());
        String token = jwtTokenProvider.generateToken(user.id(), user.userClass());
        return buildLoginResponse(token, user.id(), user.username(), user.email(), user.userClass(), user.status());
    }

    public Map<String, Object> validateUser(ValidateUserRequest req, int adminId) {
        User user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> new NotFoundException("Utilisateur non trouvé."));

        int newStatus = classToStatus(req.correctClass());
        userRepository.validateUser(user.id(), req.correctClass(), newStatus);
        mailService.sendAccountApprovedMail(user.email(), req.name());

        // auditService.log(adminId, "VALIDATE_USER", req.email(), request); // TODO: audit later

        return Map.of("message", "Utilisateur " + req.name() + " validé avec le rôle " + req.correctClass() + ".");
    }

    public Map<String, Object> changePassword(ChangePasswordRequest req, int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Utilisateur non trouvé."));

        if (user.password() == null || !passwordEncoder.matches(req.currentPassword(), user.password())) {
            throw new UnauthorizedException("Mot de passe actuel incorrect.");
        }

        userRepository.updatePassword(userId, passwordEncoder.encode(req.newPassword()));
        return Map.of("message", "Mot de passe mis à jour avec succès.");
    }

    private int classToStatus(String userClass) {
        return switch (userClass) {
            case "DFI"   -> 1;
            case "DSC"   -> 2;
            case "IN"    -> 3;
            case "ADMIN" -> 4;
            default      -> 0;
        };
    }

    private Map<String, Object> buildLoginResponse(String token, int id, String username,
                                                    String email, String userClass, int status) {
        Map<String, Object> userInfo = new LinkedHashMap<>();
        userInfo.put("id", id);
        userInfo.put("username", username);
        userInfo.put("email", email);
        userInfo.put("class", userClass);
        userInfo.put("status", status);
        return Map.of("token", token, "user", userInfo);
    }

    // ── Exception types ──────────────────────────────────────────────────────

    public static class ConflictException     extends RuntimeException { public ConflictException(String m)     { super(m); } }
    public static class UnauthorizedException extends RuntimeException { public UnauthorizedException(String m) { super(m); } }
    public static class ForbiddenException    extends RuntimeException { public ForbiddenException(String m)    { super(m); } }
    public static class NotFoundException     extends RuntimeException { public NotFoundException(String m)     { super(m); } }
}
