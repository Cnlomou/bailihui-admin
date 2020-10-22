package com.example.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Cnlomou
 * @create 2020/5/30 14:25
 */
@RestController
public class HelloController {

    @GetMapping("/hello")
    @PreAuthorize("hasAnyAuthority('admin')")
    public String hello(){
        return "hello";
    }
}
