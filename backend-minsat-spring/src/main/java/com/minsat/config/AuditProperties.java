package com.minsat.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.nio.file.Path;

@ConfigurationProperties(prefix = "audit.log")
public class AuditProperties {

    private String dir           = "./audit-logs";
    private int    maxSizeMb     = 10;
    private int    retentionDays = 30;

    public String getDir()              { return dir; }
    public void   setDir(String dir)    { this.dir = dir; }

    public int  getMaxSizeMb()          { return maxSizeMb; }
    public void setMaxSizeMb(int v)     { this.maxSizeMb = v; }

    public int  getRetentionDays()      { return retentionDays; }
    public void setRetentionDays(int v) { this.retentionDays = v; }

    /** Resolved absolute path to the log directory. */
    public Path resolvedDir() {
        return Path.of(dir).toAbsolutePath().normalize();
    }
}
