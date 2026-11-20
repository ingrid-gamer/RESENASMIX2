package com.example.resenasmix.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@AllArgsConstructor
public class CompraResponseDTO {
    private Long id;
    private BigDecimal total;
    private String estado;
    private Instant fechaCreacion;
}
