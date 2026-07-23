package com.lucaskraglievich.day23_redis_cache;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class Day23RedisCacheApplication {

    public static void main(String[] args) {
        SpringApplication.run(Day23RedisCacheApplication.class, args);
    }

}