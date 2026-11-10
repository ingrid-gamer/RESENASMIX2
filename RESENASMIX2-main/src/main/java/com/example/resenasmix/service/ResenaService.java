package com.example.resenasmix.service;

import com.example.resenasmix.dto.ResenaRequestDTO;
import com.example.resenasmix.exception.ResourceNotFoundException;
import com.example.resenasmix.model.Resena;
import com.example.resenasmix.model.Usuario;
import com.example.resenasmix.model.Videojuego;
import com.example.resenasmix.repository.ResenaRepository;
import com.example.resenasmix.repository.UsuarioRepository;
import com.example.resenasmix.repository.VideojuegoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResenaService {

    private static final Logger log = LoggerFactory.getLogger(ResenaService.class);

    private final ResenaRepository repository;
    private final UsuarioRepository usuarioRepository;
    private final VideojuegoRepository videojuegoRepository;

    @Autowired
    public ResenaService(ResenaRepository repository,
                         UsuarioRepository usuarioRepository,
                         VideojuegoRepository videojuegoRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
        this.videojuegoRepository = videojuegoRepository;
    }

    public List<Resena> listar() {
        log.debug("Listando reseñas");
        return repository.findAll();
    }

    public Resena obtenerPorId(Long id) {
        log.debug("Buscando reseña con id={}", id);
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reseña no encontrada con id " + id));
    }

    public Resena guardar(ResenaRequestDTO dto) {
        log.debug("Creando reseña usuarioId={} videojuegoId={}", dto.getUsuarioId(), dto.getVideojuegoId());
        return guardarOActualizar(null, dto);
    }

    public Resena actualizar(Long id, ResenaRequestDTO dto) {
        log.debug("Actualizando reseña id={}", id);
        obtenerPorId(id);
        return guardarOActualizar(id, dto);
    }

    private Resena guardarOActualizar(Long id, ResenaRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id " + dto.getUsuarioId()));

        Videojuego videojuego = videojuegoRepository.findById(dto.getVideojuegoId())
                .orElseThrow(() -> new ResourceNotFoundException("Videojuego no encontrado con id " + dto.getVideojuegoId()));

        Resena resena = (id == null)
                ? new Resena()
                : repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reseña no encontrada con id " + id));

        resena.setComentario(dto.getComentario());
        resena.setCalificacion(dto.getCalificacion());
        resena.setUsuario(usuario);
        resena.setVideojuego(videojuego);

        return repository.save(resena);
    }

    public void eliminar(Long id) {
        Resena resena = obtenerPorId(id);
        repository.delete(resena);
        log.debug("Reseña eliminada id={}", id);
    }
}