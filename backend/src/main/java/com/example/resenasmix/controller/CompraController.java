package com.example.resenasmix.controller;

import com.example.resenasmix.dto.CompraRequestDTO;
import com.example.resenasmix.dto.CompraResponseDTO;
import com.example.resenasmix.service.CompraService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/compras")
public class CompraController {
    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    @PostMapping
    public ResponseEntity<CompraResponseDTO> registrar(@Valid @RequestBody CompraRequestDTO request, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(compraService.registrar(authentication.getName(), request));
    }

    @GetMapping("/mis-compras")
    public List<CompraResponseDTO> misCompras(Authentication authentication) {
        return compraService.listarPropias(authentication.getName());
    }
}
