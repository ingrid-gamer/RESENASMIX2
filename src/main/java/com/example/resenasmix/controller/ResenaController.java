package com.example.resenasmix.controller;

import com.example.resenasmix.dto.ResenaRequestDTO;
import com.example.resenasmix.model.Resena;
import com.example.resenasmix.service.ResenaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resenas")
public class ResenaController {
    private final ResenaService service;

    public ResenaController(ResenaService service) { this.service = service; }

    @GetMapping
    public List<Resena> listar() { return service.listar(); }

    @GetMapping("/{id}")
    public Resena obtener(@PathVariable Long id) { return service.obtenerPorId(id); }

    @PostMapping
    public ResponseEntity<Resena> guardar(@Valid @RequestBody ResenaRequestDTO dto, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.guardar(dto, authentication.getName()));
    }

    @PutMapping("/{id}")
    public Resena actualizar(@PathVariable Long id, @Valid @RequestBody ResenaRequestDTO dto) {
        return service.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) { service.eliminar(id); }
}
