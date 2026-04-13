package com.minsat.security;

import com.minsat.vault.VaultSecretService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);

    private final VaultSecretService vaultSecretService;

    @Value("${jwt.expiration-days}")
    private int expirationDays;

    private SecretKey secretKey;

    public JwtTokenProvider(VaultSecretService vaultSecretService) {
        this.vaultSecretService = vaultSecretService;
    }

    @PostConstruct
    public void init() {
        String secret = vaultSecretService.getJwtSecret();
        // Pad secret to at least 32 bytes (256 bits) for HS256
        while (secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            secret = secret + secret;
        }
        secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        log.info("JWT SecretKey initialized");
    }

    public String generateToken(int userId, String userClass) {
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("role", userClass)
                .issuedAt(new Date())
                .expiration(Date.from(Instant.now().plus(expirationDays, ChronoUnit.DAYS)))
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    public int getUserId(String token) {
        return Integer.parseInt(getClaims(token).getSubject());
    }

    public String getRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
