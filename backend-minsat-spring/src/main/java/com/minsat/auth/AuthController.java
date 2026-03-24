package com.minsat.auth;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Stub auth endpoints — no real authentication yet.
 * Accepts any credentials and returns a hardcoded user.
 * Replace with real JWT auth when the auth service is built.
 */
@RestController
@RequestMapping("/users")
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, Object> body) {
        return Map.of(
            "token", "stub-token-no-auth",
            "user", Map.of(
                "id", 1,
                "username", body.getOrDefault("email", "user"),
                "email", body.getOrDefault("email", "user@minsat.tn"),
                "class", "ADMIN",
                "status", 1
            )
        );
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, Object> body) {
        return Map.of("message", "User registered successfully");
    }

    @GetMapping("/all")
    public Object getAllUsers() {
        return java.util.List.of(
            Map.of("id", 1, "username", "admin", "email", "admin@minsat.tn", "class", "ADMIN", "status", 1)
        );
    }
}
