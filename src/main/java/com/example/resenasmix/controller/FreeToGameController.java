package com.example.resenasmix.controller;

import com.example.resenasmix.dto.JuegoExternoDTO;
import com.example.resenasmix.service.FreeToGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/juegos-gratis")
public class FreeToGameController {

    private final FreeToGameService service;

    @Autowired
    public FreeToGameController(FreeToGameService service) {
        this.service = service;
    }

    @GetMapping
    public List<JuegoExternoDTO> listar() {
        return service.listarJuegosExternos();
    }
}