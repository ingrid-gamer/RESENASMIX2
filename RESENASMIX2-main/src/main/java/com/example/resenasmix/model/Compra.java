package com.example.resenasmix.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Entity
@Table(name = "compras")
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 80)
    private String nombre;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(nullable = false, length = 500)
    private String direccion;

    @Column(nullable = false, length = 30)
    private String entrega;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal total;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String detalleJson;

    @Column(nullable = false)
    private Instant fechaCreacion = Instant.now();

    @Column(nullable = false, length = 30)
    private String estado = "SIMULADA";
}
