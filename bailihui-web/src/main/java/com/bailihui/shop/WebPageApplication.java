package com.bailihui.shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @author Cnlomou
 * @create 2020/5/30 11:38
 */
@SpringBootApplication
public class WebPageApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(WebPageApplication.class,args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(WebPageApplication.class);
    }
}
