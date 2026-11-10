package com.example.resenasmix.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
    private String nombre;
    private String email;
}