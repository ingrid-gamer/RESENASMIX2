package com.example.resenasmix.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class CompraRequestDTO {
    @NotBlank private String nombre;
    @NotBlank @Email private String email;
    @NotBlank private String direccion;
    @NotBlank private String entrega;
    @NotEmpty private List<@Valid Item> items;

    @Data
    public static class Item {
        @NotNull private Long videojuegoId;
        @NotNull @Positive private Integer cantidad;
    }
}
