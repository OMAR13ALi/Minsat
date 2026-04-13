package com.minsat.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank String username,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, message = "Le mot de passe doit avoir au moins 8 caractères")
        @Pattern(regexp = ".*\\d.*", message = "Le mot de passe doit contenir au moins un chiffre")
        String password,
        @Pattern(regexp = "DFI|DSC|IN|ADMIN", message = "Rôle invalide")
        String userClass
) {}
