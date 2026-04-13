package com.minsat.auth;

import java.time.LocalDateTime;

public record User(
        int id,
        String username,
        String email,
        String password,         // bcrypt hash, nullable for legacy Vault-only rows
        String userClass,        // maps to `class` column: DFI, DSC, IN, ADMIN
        int status,              // 0=pending, 1=DFI, 2=DSC, 3=IN, 4=ADMIN
        LocalDateTime loginAt,
        LocalDateTime createdAt,
        String resetToken,
        LocalDateTime resetTokenExpiry
) {}
