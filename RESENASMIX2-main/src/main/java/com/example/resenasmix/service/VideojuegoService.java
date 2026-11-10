package com.example.resenasmix.service;

import com.example.resenasmix.exception.ResourceNotFoundException;
import com.example.resenasmix.model.Videojuego;
import com.example.resenasmix.repository.VideojuegoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideojuegoService {

    private static final Logger log = LoggerFactory.getLogger(VideojuegoService.class);

    private final VideojuegoRepository repository;

    @Autowired
    public VideojuegoService(VideojuegoRepository repository) {
        this.repository = repository;
    }

    public List<Videojuego> listar() {
        log.debug("Listando videojuegos");
        return repository.findAll();
    }

    public Videojuego obtenerPorId(Long id) {
        log.debug("Buscando videojuego con id={}", id);
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Videojuego no encontrado con id " + id));
    }

    public Videojuego guardar(Videojuego v) {
        log.debug("Guardando videojuego {}", v.getTitulo());
        return repository.save(v);
    }

    public Videojuego actualizar(Long id, Videojuego datos) {
        Videojuego videojuego = obtenerPorId(id);
        videojuego.setTitulo(datos.getTitulo());
        videojuego.setConsola(datos.getConsola());
        videojuego.setGenero(datos.getGenero());
        log.debug("Actualizando videojuego id={}", id);
        return repository.save(videojuego);
    }

    public void eliminar(Long id) {
        Videojuego videojuego = obtenerPorId(id);
        repository.delete(videojuego);
        log.debug("Videojuego eliminado id={}", id);
    }
}