package com.minsat.auth;

import com.minsat.logs.AuditService;
import com.minsat.security.MinSatUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final AuditService audit;

    public AuthController(AuthService authService, UserRepository userRepository, AuditService audit) {
        this.authService    = authService;
        this.userRepository = userRepository;
        this.audit          = audit;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @Valid @RequestBody LoginRequest req, HttpServletRequest request) {
        try {
            Map<String, Object> result = authService.login(req);
            // Extract username from response to log the real username
            Object userObj = result.get("user");
            String username = req.email();
            if (userObj instanceof Map<?,?> userMap) {
                Object u = userMap.get("username");
                if (u != null) username = u.toString();
            }
            audit.log(username, null, "LOGIN_SUCCESS", null,
                    audit.toJson(Map.of("email", req.email())),
                    audit.extractIp(request), "SUCCESS");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            audit.log(req.email(), null, "LOGIN_FAILURE", null,
                    audit.toJson(Map.of("email", req.email(), "reason", e.getMessage())),
                    audit.extractIp(request), "FAILURE");
            throw e;
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/validate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> validate(
            @Valid @RequestBody ValidateUserRequest req,
            @AuthenticationPrincipal MinSatUserDetails principal) {
        return ResponseEntity.ok(authService.validateUser(req, principal != null ? principal.getId() : 0));
    }

    @PatchMapping("/block/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> blockUser(@PathVariable int id) {
        userRepository.setStatus(id, 0);
        return ResponseEntity.ok(Map.of("message", "User blocked."));
    }

    @PatchMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable int id,
            @RequestBody Map<String, Object> body) {
        String cls = (String) body.get("class");
        if (cls != null) userRepository.validateUser(id, cls, classToStatus(cls));
        return ResponseEntity.ok(Map.of("message", "User updated."));
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

    @PostMapping("/changepassword")
    public ResponseEntity<Map<String, Object>> changePassword(
            @Valid @RequestBody ChangePasswordRequest req,
            @AuthenticationPrincipal MinSatUserDetails principal) {
        return ResponseEntity.ok(authService.changePassword(req, principal != null ? principal.getId() : 0));
    }

    // ── Exception handlers ───────────────────────────────────────────────────

    @ExceptionHandler(AuthService.ConflictException.class)
    public ResponseEntity<Map<String, Object>> handleConflict(AuthService.ConflictException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(AuthService.UnauthorizedException.class)
    public ResponseEntity<Map<String, Object>> handleUnauthorized(AuthService.UnauthorizedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(AuthService.ForbiddenException.class)
    public ResponseEntity<Map<String, Object>> handleForbidden(AuthService.ForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(AuthService.NotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(AuthService.NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
    }
}
