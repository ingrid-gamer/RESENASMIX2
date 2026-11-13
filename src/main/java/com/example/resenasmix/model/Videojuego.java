package com.example.resenasmix.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "videojuegos")
public class Videojuego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 100, message = "El título no puede superar 100 caracteres")
    @Column(nullable = false, length = 100)
    private String titulo;

    @NotBlank(message = "El género es obligatorio")
    @Size(max = 50, message = "El género no puede superar 50 caracteres")
    @Column(nullable = false, length = 50)
    private String genero;

    @NotBlank(message = "La consola es obligatoria")
    @Size(max = 50, message = "La consola no puede superar 50 caracteres")
    @Column(nullable = false, length = 50)
    private String consola;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.00", message = "El precio no puede ser negativo")
    @Column(precision = 12, scale = 2, nullable = false)
    private BigDecimal precio = BigDecimal.ZERO;

    @Column(precision = 12, scale = 2)
    private BigDecimal precioOferta;

    @Column(nullable = true)
    private Boolean enOferta = false;

    @Column(length = 2048)
    private String imagen;

    @Lob
    private String descripcion;

    // MySQL almacena este mapa en una columna JSON; React recibe un objeto JSON.
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, String> requisitosMinimos;

    @OneToMany(mappedBy = "videojuego", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Resena> resenas;
}
