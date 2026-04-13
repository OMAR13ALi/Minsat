package com.minsat.logs;

import java.time.LocalDateTime;

public record SystemLog(
        long id,
        LocalDateTime timestamp,
        String userLogin,
        String userRole,
        String actionType,
        String targetMsisdn,
        String details,
        String ipAddress,
        String status,
        String airResponseCode
) {}
