package com.minsat.help;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class HelpRepository {

    private final JdbcTemplate jdbc;

    public HelpRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> getServiceClasses() {
        return jdbc.queryForList("SELECT * FROM serviceclasses");
    }

    public List<Map<String, Object>> getUaGroups() {
        return jdbc.queryForList("SELECT * FROM uagroup");
    }

    public List<Map<String, Object>> getServiceIdentifiers() {
        return jdbc.queryForList("SELECT * FROM serviceidentifier");
    }

    public List<Map<String, Object>> getOffers() {
        return jdbc.queryForList("SELECT * FROM offer");
    }

    public List<Map<String, Object>> getUsageCounters() {
        return jdbc.queryForList("SELECT * FROM usagecounters");
    }
}
