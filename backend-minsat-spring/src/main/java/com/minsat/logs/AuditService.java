package com.minsat.logs;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class AuditService {

    private final ObjectMapper    objectMapper;
    private final AuditFileWriter writer;

    public AuditService(ObjectMapper objectMapper, AuditFileWriter writer) {
        this.objectMapper = objectMapper;
        this.writer       = writer;
    }

    /**
     * Asynchronously append an audit entry to the JSONL log file.
     * Fire-and-forget — never blocks the request thread.
     */
    @Async
    public void log(String userLogin, String userRole, String actionType,
                    String targetMsisdn, String details, String ipAddress,
                    String status, String airResponseCode) {
        try {
            long id = System.currentTimeMillis() * 1_000_000L
                    + (Thread.currentThread().getId() % 1_000_000L);

            SystemLog entry = new SystemLog(
                    id,
                    LocalDateTime.now(),
                    userLogin, userRole, actionType, targetMsisdn,
                    details, ipAddress, status, airResponseCode
            );

            writer.append(objectMapper.writeValueAsString(entry));

        } catch (Exception ignored) {
            // Logging must never break the main request
        }
    }

    // ── Convenience overload without airResponseCode ─────────────────────────

    @Async
    public void log(String userLogin, String userRole, String actionType,
                    String targetMsisdn, String details, String ipAddress, String status) {
        log(userLogin, userRole, actionType, targetMsisdn, details, ipAddress, status, null);
    }

    // ── Context helpers ──────────────────────────────────────────────────────

    /** Extracts the authenticated username from the Spring Security context, or "anonymous". */
    public String currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()
                && !"anonymousUser".equals(String.valueOf(auth.getPrincipal()))) {
            return auth.getName();
        }
        return "anonymous";
    }

    /** Extracts the first granted role (stripped of ROLE_ prefix), or "UNKNOWN". */
    public String currentRole() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities() != null && !auth.getAuthorities().isEmpty()) {
            return auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        }
        return "UNKNOWN";
    }

    /** Gets the real client IP, honouring X-Forwarded-For if present. */
    public String extractIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        return (xff != null && !xff.isBlank()) ? xff.split(",")[0].trim() : request.getRemoteAddr();
    }

    /** Serialises a Map to a compact JSON string. Returns "{}" on error. */
    public String toJson(Map<String, Object> map) {
        try {
            return objectMapper.writeValueAsString(map);
        } catch (Exception e) {
            return "{}";
        }
    }
}
