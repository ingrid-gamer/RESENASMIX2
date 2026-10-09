package com.example.resenasmix.service;

import com.example.resenasmix.exception.ResourceNotFoundException;
import com.example.resenasmix.model.Usuario;
import com.example.resenasmix.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private static final Logger log = LoggerFactory.getLogger(UsuarioService.class);

    private final UsuarioRepository repository;

    @Autowired
    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listar() {
        log.debug("Listando usuarios");
        return repository.findAll();
    }

    public Usuario obtenerPorId(Long id) {
        log.debug("Buscando usuario con id={}", id);
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id " + id));
    }

    public Usuario guardar(Usuario u) {
        log.debug("Guardando usuario {}", u.getEmail());
        return repository.save(u);
    }

    public Usuario actualizar(Long id, Usuario datos) {
        Usuario usuario = obtenerPorId(id);
        usuario.setNombre(datos.getNombre());
        usuario.setEmail(datos.getEmail());
        log.debug("Actualizando usuario id={}", id);
        return repository.save(usuario);
    }

    public void eliminar(Long id) {
        Usuario usuario = obtenerPorId(id);
        repository.delete(usuario);
        log.debug("Usuario eliminado id={}", id);
    }
}