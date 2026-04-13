package com.minsat.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotBlank String currentPassword,
        @NotBlank @Size(min = 8, message = "Le mot de passe doit avoir au moins 8 caractères")
        @Pattern(regexp = ".*\\d.*", message = "Le mot de passe doit contenir au moins un chiffre")
        String newPassword
) {}
