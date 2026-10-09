package com.example.resenasmix.controller;

import com.example.resenasmix.model.Videojuego;
import com.example.resenasmix.service.VideojuegoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/videojuegos")
public class VideojuegoController {

    private final VideojuegoService service;

    @Autowired
    public VideojuegoController(VideojuegoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Videojuego> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Videojuego obtener(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public ResponseEntity<Videojuego> guardar(@Valid @RequestBody Videojuego v) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.guardar(v));
    }

    @PutMapping("/{id}")
    public Videojuego actualizar(@PathVariable Long id, @Valid @RequestBody Videojuego v) {
        return service.actualizar(id, v);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}