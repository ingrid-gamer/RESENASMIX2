package com.example.resenasmix.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {
    private static final Logger log = LoggerFactory.getLogger(HealthController.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        log.info("HEARTBEAT event=ping status=UP timestamp={}", Instant.now());
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "RESENASMIX2",
                "timestamp", Instant.now().toString()
        ));
    }

    @GetMapping("/db")
    public ResponseEntity<Map<String, Object>> dbCheck() {
        try {
            jdbcTemplate.execute("SELECT 1");
            log.info("HEALTH event=db-check status=UP timestamp={}", Instant.now());
            return ResponseEntity.ok(Map.of(
                    "status", "UP",
                    "database", "CONNECTED",
                    "timestamp", Instant.now().toString()
            ));
        } catch (Exception e) {
            log.error("HEALTH event=db-check status=DOWN error={}", e.getMessage());
            return ResponseEntity.status(503).body(Map.of(
                    "status", "DOWN",
                    "database", "DISCONNECTED",
                    "error", e.getMessage()
            ));
        }
    }
}
