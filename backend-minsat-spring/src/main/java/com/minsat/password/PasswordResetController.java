package com.minsat.password;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@Validated
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/forgetpassword")
    public ResponseEntity<Map<String, Object>> forgotPassword(
            @RequestBody Map<String, String> body) {
        String email = body.getOrDefault("email", "").trim();
        return ResponseEntity.ok(passwordResetService.forgotPassword(email));
    }

    @PostMapping("/resetpassword")
    public ResponseEntity<Map<String, Object>> resetPassword(
            @RequestBody Map<String, String> body) {
        String token    = body.getOrDefault("token", "").trim();
        String password = body.getOrDefault("password", "").trim();

        if (token.isBlank() || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token et mot de passe requis."));
        }
        if (password.length() < 8) {
            return ResponseEntity.badRequest().body(Map.of("error", "Le mot de passe doit avoir au moins 8 caractères."));
        }

        return ResponseEntity.ok(passwordResetService.resetPassword(token, password));
    }

    @ExceptionHandler(PasswordResetService.InvalidTokenException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidToken(PasswordResetService.InvalidTokenException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
    }
}
