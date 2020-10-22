package com.example.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * @author Cnlomou
 * @create 2020/5/30 14:43
 */
public class AuthenticationAuthorInfo extends AuthenticationWraper {
    private Collection<? extends GrantedAuthority> grantedAuthorities;

    public AuthenticationAuthorInfo(Authentication authentication, Collection<? extends GrantedAuthority> grantedAuthorities) {
        super(authentication);
        this.grantedAuthorities = grantedAuthorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.grantedAuthorities;
    }
}
