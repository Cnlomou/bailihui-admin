package com.example.config;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * @author Cnlomou
 * @create 2020/5/30 14:38
 */
public class AuthenticationWraper implements Authentication {

    private Authentication authentication;
    public AuthenticationWraper(Authentication authentication){
        this.authentication=authentication;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authentication.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return this.authentication.getCredentials();
    }

    @Override
    public Object getDetails() {
        return this.authentication.getDetails();
    }

    @Override
    public Object getPrincipal() {
        return this.authentication.getPrincipal();
    }

    @Override
    public boolean isAuthenticated() {
        return this.authentication.isAuthenticated();
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        this.authentication.setAuthenticated(isAuthenticated);
    }

    @Override
    public String getName() {
        return this.authentication.getName();
    }

}
