package com.example.resenasmix.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResenaRequestDTO {

    @NotNull(message = "usuarioId es obligatorio")
    private Long usuarioId;

    @NotNull(message = "videojuegoId es obligatorio")
    private Long videojuegoId;

    @NotBlank(message = "El comentario es obligatorio")
    @Size(min = 5, max = 500, message = "El comentario debe tener entre 5 y 500 caracteres")
    private String comentario;

    @NotNull(message = "La calificación es obligatoria")
    @Min(value = 1, message = "La calificación mínima es 1")
    @Max(value = 5, message = "La calificación máxima es 5")
    private Integer calificacion;
}