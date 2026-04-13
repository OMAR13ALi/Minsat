package com.minsat.logs;

import com.minsat.config.AuditProperties;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.util.concurrent.locks.ReentrantLock;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Thread-safe writer for audit JSONL log files.
 * Rotates on date change or when the current file exceeds maxSizeMb.
 * Purges files older than retentionDays every night at 01:00.
 */
@Service
public class AuditFileWriter {

    private static final Logger log = LoggerFactory.getLogger(AuditFileWriter.class);
    private static final Pattern DATE_PATTERN = Pattern.compile("audit_(\\d{4}-\\d{2}-\\d{2})(?:_(\\d+))?\\.jsonl");

    private final Path dir;
    private final long maxBytes;
    private final int  retentionDays;

    private final ReentrantLock lock = new ReentrantLock();

    // guarded by lock
    private Path      currentPath;
    private LocalDate currentDate;
    private int       currentSuffix;

    public AuditFileWriter(AuditProperties props) {
        this.dir           = props.resolvedDir();
        this.maxBytes      = (long) props.getMaxSizeMb() * 1024 * 1024;
        this.retentionDays = props.getRetentionDays();
    }

    @PostConstruct
    void init() {
        try {
            Files.createDirectories(dir);
        } catch (IOException e) {
            log.warn("Could not create audit log directory {}: {}", dir, e.getMessage());
        }
        LocalDate today = LocalDate.now();
        currentDate   = today;
        currentSuffix = findHighestSuffix(today);
        currentPath   = buildPath(today, currentSuffix);
    }

    /**
     * Appends a single JSON line to the current audit file.
     * Thread-safe; never throws — failures are logged at WARN only.
     */
    void append(String jsonLine) {
        lock.lock();
        try {
            LocalDate today = LocalDate.now();

            // Date rolled over → new file, reset suffix
            if (!today.equals(currentDate)) {
                currentDate   = today;
                currentSuffix = 0;
                currentPath   = buildPath(today, 0);
            }

            // Current file hit size limit → increment suffix
            if (Files.exists(currentPath) && Files.size(currentPath) >= maxBytes) {
                currentSuffix++;
                currentPath = buildPath(currentDate, currentSuffix);
            }

            Files.writeString(currentPath, jsonLine + "\n",
                    StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND);

        } catch (IOException e) {
            log.warn("Audit file write failed: {}", e.getMessage());
        } finally {
            lock.unlock();
        }
    }

    /** Runs at 01:00 every day — deletes files older than retentionDays. */
    @Scheduled(cron = "0 0 1 * * *")
    void purgeOldFiles() {
        LocalDate cutoff = LocalDate.now().minusDays(retentionDays);
        try (var stream = Files.list(dir)) {
            stream
                .filter(p -> p.getFileName().toString().startsWith("audit_"))
                .filter(p -> p.getFileName().toString().endsWith(".jsonl"))
                .forEach(p -> {
                    LocalDate fileDate = extractDate(p);
                    if (fileDate != null && fileDate.isBefore(cutoff)) {
                        try {
                            Files.delete(p);
                            log.info("Purged old audit file: {}", p.getFileName());
                        } catch (IOException e) {
                            log.warn("Could not delete audit file {}: {}", p.getFileName(), e.getMessage());
                        }
                    }
                });
        } catch (IOException e) {
            log.warn("Audit retention purge failed: {}", e.getMessage());
        }
    }

    // ── package-private helpers used by SystemLogController ─────────────────

    Path getDir() { return dir; }

    // ── private helpers ──────────────────────────────────────────────────────

    private Path buildPath(LocalDate date, int suffix) {
        String name = suffix == 0
            ? "audit_" + date + ".jsonl"
            : "audit_" + date + "_" + suffix + ".jsonl";
        return dir.resolve(name);
    }

    /**
     * Scans the directory for existing files matching today's date
     * and returns the highest suffix found (0 if only the base file exists
     * or no file exists yet).
     */
    private int findHighestSuffix(LocalDate date) {
        String prefix = "audit_" + date;
        int highest = 0;
        try (var stream = Files.list(dir)) {
            highest = stream
                .map(p -> p.getFileName().toString())
                .filter(n -> n.startsWith(prefix) && n.endsWith(".jsonl"))
                .mapToInt(n -> {
                    Matcher m = DATE_PATTERN.matcher(n);
                    if (m.matches()) {
                        String s = m.group(2);
                        return s != null ? Integer.parseInt(s) : 0;
                    }
                    return 0;
                })
                .max()
                .orElse(0);
        } catch (IOException e) {
            // dir may not exist yet — init() will create it
        }
        return highest;
    }

    LocalDate extractDate(Path p) {
        Matcher m = DATE_PATTERN.matcher(p.getFileName().toString());
        return m.matches() ? LocalDate.parse(m.group(1)) : null;
    }
}
