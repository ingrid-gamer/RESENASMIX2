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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResenaService {
    private static final Logger log = LoggerFactory.getLogger(ResenaService.class);
    private final ResenaRepository repository;
    private final UsuarioRepository usuarioRepository;
    private final VideojuegoRepository videojuegoRepository;

    public ResenaService(ResenaRepository repository, UsuarioRepository usuarioRepository, VideojuegoRepository videojuegoRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
        this.videojuegoRepository = videojuegoRepository;
    }

    @Transactional(readOnly = true)
    public List<Resena> listar() { return repository.findAll(); }

    @Transactional(readOnly = true)
    public Resena obtenerPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Reseña no encontrada con id " + id));
    }

    @Transactional
    public Resena guardar(ResenaRequestDTO dto, String usernameAutenticado) {
        // La identidad se deriva del JWT; nunca se confía en usuarioId enviado por el navegador.
        Usuario usuario = usuarioRepository.findByUsername(usernameAutenticado)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario autenticado no encontrado"));
        Videojuego videojuego = videojuegoRepository.findById(dto.getVideojuegoId())
                .orElseThrow(() -> new ResourceNotFoundException("Videojuego no encontrado con id " + dto.getVideojuegoId()));

        Resena resena = new Resena();
        resena.setComentario(dto.getComentario().trim());
        resena.setCalificacion(dto.getCalificacion());
        resena.setUsuario(usuario);
        resena.setVideojuego(videojuego);
        log.info("Creando reseña usuario={} videojuegoId={}", usernameAutenticado, videojuego.getId());
        return repository.save(resena);
    }

    @Transactional
    public Resena actualizar(Long id, ResenaRequestDTO dto) {
        Resena resena = obtenerPorId(id);
        Videojuego videojuego = videojuegoRepository.findById(dto.getVideojuegoId())
                .orElseThrow(() -> new ResourceNotFoundException("Videojuego no encontrado con id " + dto.getVideojuegoId()));
        // La edición administrativa mantiene el autor original de la reseña.
        resena.setComentario(dto.getComentario().trim());
        resena.setCalificacion(dto.getCalificacion());
        resena.setVideojuego(videojuego);
        return repository.save(resena);
    }

    public void eliminar(Long id) { repository.delete(obtenerPorId(id)); }
}
