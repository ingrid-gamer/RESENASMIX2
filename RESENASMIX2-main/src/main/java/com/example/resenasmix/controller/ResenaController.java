package com.example.resenasmix.controller;

import com.example.resenasmix.dto.ResenaRequestDTO;
import com.example.resenasmix.model.Resena;
import com.example.resenasmix.service.ResenaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/resenas")
public class ResenaController {

    private final ResenaService service;

    @Autowired
    public ResenaController(ResenaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Resena> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Resena obtener(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public ResponseEntity<Resena> guardar(@Valid @RequestBody ResenaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.guardar(dto));
    }

    @PutMapping("/{id}")
    public Resena actualizar(@PathVariable Long id, @Valid @RequestBody ResenaRequestDTO dto) {
        return service.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}