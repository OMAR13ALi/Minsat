 package com.minsat.logs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minsat.config.AuditProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/logs")
public class SystemLogController {

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final Pattern DATE_PATTERN  = Pattern.compile("audit_(\\d{4}-\\d{2}-\\d{2})(?:_(\\d+))?\\.jsonl");

    private final Path         dir;
    private final ObjectMapper objectMapper;

    public SystemLogController(AuditProperties props, ObjectMapper objectMapper) {
        this.dir          = props.resolvedDir();
        this.objectMapper = objectMapper;
    }

    /**
     * GET /admin/logs
     * Params: page (0-based), size, userLogin, actionType, msisdn, status, from, to
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getLogs(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "25") int    size,
            @RequestParam(required = false) String userLogin,
            @RequestParam(required = false) String actionType,
            @RequestParam(required = false) String msisdn,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        LocalDateTime fromDt = hasValue(from) ? LocalDateTime.parse(from, FMT) : null;
        LocalDateTime toDt   = hasValue(to)   ? LocalDateTime.parse(to,   FMT) : null;

        LocalDate fromDate = fromDt != null ? fromDt.toLocalDate() : null;
        LocalDate toDate   = toDt   != null ? toDt.toLocalDate()   : null;

        List<SystemLog> all = collectFromFiles(fromDate, toDate);

        List<SystemLog> filtered = all.stream()
                .filter(l -> !hasValue(userLogin)  || containsIgnoreCase(l.userLogin(),     userLogin))
                .filter(l -> !hasValue(actionType) || Objects.equals(l.actionType(),         actionType))
                .filter(l -> !hasValue(msisdn)     || (l.targetMsisdn() != null && l.targetMsisdn().contains(msisdn)))
                .filter(l -> !hasValue(status)     || l.status().equalsIgnoreCase(status))
                .filter(l -> fromDt == null        || !l.timestamp().isBefore(fromDt))
                .filter(l -> toDt   == null        || !l.timestamp().isAfter(toDt))
                .collect(Collectors.toList());

        int total   = filtered.size();
        int capSize = Math.min(size, 100);
        int offset  = page * capSize;

        List<SystemLog> pageSlice = filtered.stream()
                .skip(offset)
                .limit(capSize)
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of(
                "logs",  pageSlice,
                "total", total,
                "page",  page,
                "size",  size
        ));
    }

    /**
     * GET /admin/logs/stats
     * Returns today's activity counts for the dashboard cards.
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        List<SystemLog> today = collectFromFiles(LocalDate.now(), LocalDate.now());

        int total    = today.size();
        int queries  = (int) today.stream().filter(l -> l.actionType() != null && l.actionType().endsWith("_QUERY")).count();
        int updates  = (int) today.stream().filter(l -> l.actionType() != null && l.actionType().startsWith("UPDATE_")).count();
        int logins   = (int) today.stream().filter(l -> l.actionType() != null && l.actionType().startsWith("LOGIN_")).count();
        int active   = (int) today.stream().map(SystemLog::userLogin).filter(Objects::nonNull).distinct().count();
        int failures = (int) today.stream().filter(l -> "FAILURE".equals(l.status())).count();

        return ResponseEntity.ok(Map.of(
                "totalToday",    total,
                "queriesToday",  queries,
                "updatesToday",  updates,
                "loginsToday",   logins,
                "activeUsers",   active,
                "failuresToday", failures
        ));
    }

    /**
     * GET /admin/logs/action-types
     * Returns distinct action_type values from the last 7 days (for filter dropdowns).
     */
    @GetMapping("/action-types")
    public ResponseEntity<List<String>> getActionTypes() {
        List<String> types = collectFromFiles(LocalDate.now().minusDays(7), LocalDate.now())
                .stream()
                .map(SystemLog::actionType)
                .filter(Objects::nonNull)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
        return ResponseEntity.ok(types);
    }

    /**
     * GET /admin/logs/export
     * Same filters as /admin/logs but returns ALL matching results (no page cap).
     * Used by the frontend Excel export button.
     */
    @GetMapping("/export")
    public ResponseEntity<List<SystemLog>> exportLogs(
            @RequestParam(required = false) String userLogin,
            @RequestParam(required = false) String actionType,
            @RequestParam(required = false) String msisdn,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to
    ) {
        LocalDateTime fromDt = hasValue(from) ? LocalDateTime.parse(from, FMT) : null;
        LocalDateTime toDt   = hasValue(to)   ? LocalDateTime.parse(to,   FMT) : null;

        LocalDate fromDate = fromDt != null ? fromDt.toLocalDate() : null;
        LocalDate toDate   = toDt   != null ? toDt.toLocalDate()   : null;

        List<SystemLog> filtered = collectFromFiles(fromDate, toDate).stream()
                .filter(l -> !hasValue(userLogin)  || containsIgnoreCase(l.userLogin(),  userLogin))
                .filter(l -> !hasValue(actionType) || Objects.equals(l.actionType(),     actionType))
                .filter(l -> !hasValue(msisdn)     || (l.targetMsisdn() != null && l.targetMsisdn().contains(msisdn)))
                .filter(l -> !hasValue(status)     || l.status().equalsIgnoreCase(status))
                .filter(l -> fromDt == null        || !l.timestamp().isBefore(fromDt))
                .filter(l -> toDt   == null        || !l.timestamp().isAfter(toDt))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filtered);
    }

    // ── file reading helpers ──────────────────────────────────────────────────

    /**
     * Collects all log entries from files within the given date range,
     * sorted newest-first. Pass null for open-ended ranges.
     */
    private List<SystemLog> collectFromFiles(LocalDate fromDate, LocalDate toDate) {
        List<LocalDate> dates = allAuditDates();

        List<SystemLog> result = new ArrayList<>();
        for (LocalDate date : dates) {
            if (fromDate != null && date.isBefore(fromDate)) continue;
            if (toDate   != null && date.isAfter(toDate))    continue;
            for (Path file : filesForDate(date)) {
                result.addAll(readFile(file));
            }
        }

        result.sort(Comparator.comparing(SystemLog::timestamp).reversed());
        return result;
    }

    /** Returns all files for a given date, sorted by suffix ascending (0, 1, 2 …). */
    private List<Path> filesForDate(LocalDate date) {
        String prefix = "audit_" + date;
        List<Path> files = new ArrayList<>();
        try (var stream = Files.list(dir)) {
            stream
                .filter(p -> p.getFileName().toString().startsWith(prefix)
                          && p.getFileName().toString().endsWith(".jsonl"))
                .sorted(Comparator.comparingInt(p -> suffixOf(p.getFileName().toString())))
                .forEach(files::add);
        } catch (IOException e) {
            // dir may not exist on first run
        }
        return files;
    }

    /** Returns all unique dates present in the log directory, sorted descending. */
    private List<LocalDate> allAuditDates() {
        Set<LocalDate> dates = new HashSet<>();
        try (var stream = Files.list(dir)) {
            stream
                .map(p -> p.getFileName().toString())
                .filter(n -> n.startsWith("audit_") && n.endsWith(".jsonl"))
                .forEach(n -> {
                    Matcher m = DATE_PATTERN.matcher(n);
                    if (m.matches()) dates.add(LocalDate.parse(m.group(1)));
                });
        } catch (IOException e) {
            // dir may not exist yet
        }
        return dates.stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());
    }

    /** Reads all valid log entries from a single file. Skips corrupt/blank lines. */
    private List<SystemLog> readFile(Path p) {
        if (!Files.exists(p)) return List.of();
        try {
            return Files.readAllLines(p, StandardCharsets.UTF_8).stream()
                    .filter(line -> !line.isBlank())
                    .map(line -> {
                        try { return objectMapper.readValue(line, SystemLog.class); }
                        catch (Exception e) { return null; }
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            return List.of();
        }
    }

    // ── small utilities ───────────────────────────────────────────────────────

    private int suffixOf(String filename) {
        Matcher m = DATE_PATTERN.matcher(filename);
        if (m.matches()) {
            String s = m.group(2);
            return s != null ? Integer.parseInt(s) : 0;
        }
        return 0;
    }

    private boolean hasValue(String s) {
        return s != null && !s.isBlank();
    }

    private boolean containsIgnoreCase(String haystack, String needle) {
        return haystack != null && haystack.toLowerCase().contains(needle.toLowerCase());
    }
}
