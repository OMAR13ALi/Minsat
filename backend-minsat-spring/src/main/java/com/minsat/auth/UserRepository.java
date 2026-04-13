package com.minsat.auth;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbc;

    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private static final RowMapper<User> ROW_MAPPER = (rs, rowNum) -> new User(
            rs.getInt("id"),
            rs.getString("username"),
            rs.getString("email"),
            rs.getString("password"),
            rs.getString("class"),
            rs.getInt("status"),
            toLocalDateTime(rs.getTimestamp("login_at")),
            toLocalDateTime(rs.getTimestamp("created_at")),
            rs.getString("reset_token"),
            toLocalDateTime(rs.getTimestamp("reset_token_expiry"))
    );

    private static LocalDateTime toLocalDateTime(Timestamp ts) {
        return ts != null ? ts.toLocalDateTime() : null;
    }

    public Optional<User> findByEmail(String email) {
        List<User> users = jdbc.query(
                "SELECT * FROM users WHERE email = ?", ROW_MAPPER, email);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    public Optional<User> findById(int id) {
        List<User> users = jdbc.query(
                "SELECT * FROM users WHERE id = ?", ROW_MAPPER, id);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    public Optional<User> findByResetToken(String token) {
        List<User> users = jdbc.query(
                "SELECT * FROM users WHERE reset_token = ?", ROW_MAPPER, token);
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    /** Returns all users without exposing password, reset_token, or reset_token_expiry. */
    public List<User> findAll() {
        return jdbc.query(
                "SELECT id, username, email, NULL AS password, `class`, status, login_at, created_at, NULL AS reset_token, NULL AS reset_token_expiry FROM users",
                ROW_MAPPER);
    }

    public void insert(String username, String email, String hashedPassword, String userClass) {
        jdbc.update(
                "INSERT INTO users (username, email, password, `class`, status) VALUES (?, ?, ?, ?, 0)",
                username, email, hashedPassword, userClass);
    }

    public void updateLoginAt(int id, LocalDateTime loginAt) {
        jdbc.update("UPDATE users SET login_at = ? WHERE id = ?", loginAt, id);
    }

    public void setStatus(int id, int status) {
        jdbc.update("UPDATE users SET status = ? WHERE id = ?", status, id);
    }

    public void validateUser(int id, String userClass, int status) {
        jdbc.update("UPDATE users SET `class` = ?, status = ? WHERE id = ?", userClass, status, id);
    }

    public void updatePassword(int id, String hashedPassword) {
        jdbc.update("UPDATE users SET password = ? WHERE id = ?", hashedPassword, id);
    }

    public void saveResetToken(int id, String token, LocalDateTime expiry) {
        jdbc.update("UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?",
                token, expiry, id);
    }

    public void clearResetToken(int id) {
        jdbc.update("UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE id = ?", id);
    }
}
