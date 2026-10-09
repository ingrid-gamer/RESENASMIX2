package com.example.resenasmix.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "videojuegos")
public class Videojuego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 100, message = "El título no puede superar 100 caracteres")
    private String titulo;

    @NotBlank(message = "El género es obligatorio")
    @Size(max = 50, message = "El género no puede superar 50 caracteres")
    private String genero;

    @NotBlank(message = "La consola es obligatoria")
    @Size(max = 50, message = "La consola no puede superar 50 caracteres")
    private String consola;

    @OneToMany(mappedBy = "videojuego", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Resena> resenas;
}