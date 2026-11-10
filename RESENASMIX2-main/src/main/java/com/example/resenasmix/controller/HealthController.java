package com.example.resenasmix.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {
    private static final Logger log = LoggerFactory.getLogger(HealthController.class);

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        log.info("HEARTBEAT event=ping status=UP timestamp={}", Instant.now());
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "RESENASMIX2",
                "timestamp", Instant.now().toString()
        ));
    }
}
