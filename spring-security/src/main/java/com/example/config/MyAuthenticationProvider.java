package com.example.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;

/**
 * @author Cnlomou
 * @create 2020/5/30 13:57
 */
@Slf4j
public class MyAuthenticationProvider implements AuthenticationProvider {

    /**
     * 给认证信息添加授权
     *
     * @param authentication
     * @return
     * @throws AuthenticationException
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if(authentication instanceof  AuthenticationAuthorInfo){
            return  authentication;
        }
        log.info("认证信息:{} => {}", authentication.getClass().getName(), authentication);
        log.info("授权信息:{}", authentication.getAuthorities());
        return new AuthenticationAuthorInfo(authentication, Arrays.asList(new SimpleGrantedAuthority("admin")));
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
