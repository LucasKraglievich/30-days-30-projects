package com.lucaskraglievich.day26_async_scheduled;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAsync
@EnableScheduling
@SpringBootApplication
public class Day26AsyncScheduledApplication {

    public static void main(String[] args) {
        SpringApplication.run(Day26AsyncScheduledApplication.class, args);
    }
}