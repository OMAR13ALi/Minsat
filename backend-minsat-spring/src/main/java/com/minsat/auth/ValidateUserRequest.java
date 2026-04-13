package com.minsat.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ValidateUserRequest(
        @NotBlank @Email String email,
        @NotBlank String name,
        @NotBlank @Pattern(regexp = "DFI|DSC|IN|ADMIN", message = "Rôle invalide")
        String correctClass
) {}
