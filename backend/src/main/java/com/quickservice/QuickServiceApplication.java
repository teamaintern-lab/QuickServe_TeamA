package com.quickservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication; // ✅ MISSING IMPORT
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class QuickServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuickServiceApplication.class, args);
    }
}

