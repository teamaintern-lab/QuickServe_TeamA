package com.quickservice;

import org.springframework.boot.SpringApplication;
<<<<<<< HEAD
import org.springframework.boot.autoconfigure.SpringBootApplication; // ✅ MISSING IMPORT
=======
import org.springframework.boot.autoconfigure.SpringBootApplication;
>>>>>>> 6fafcb9 (updated project code)
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
@EnableAsync
public class QuickServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuickServiceApplication.class, args);
    }
}

