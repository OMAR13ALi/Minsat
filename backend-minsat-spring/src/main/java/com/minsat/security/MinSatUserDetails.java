package com.minsat.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class MinSatUserDetails implements UserDetails {

    private final int id;
    private final String username;
    private final String email;
    private final String role;

    public MinSatUserDetails(int id, String username, String email, String role) {
        this.id       = id;
        this.username = username;
        this.email    = email;
        this.role     = role;
    }

    public int getId()     { return id; }
    public String getEmail()  { return email; }
    public String getRole()   { return role; }

    @Override public String getUsername()   { return username; }
    @Override public String getPassword()   { return null; }
    @Override public boolean isAccountNonExpired()    { return true; }
    @Override public boolean isAccountNonLocked()     { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled()              { return true; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }
}
