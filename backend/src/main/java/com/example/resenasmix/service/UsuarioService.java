package com.example.resenasmix.service;

import com.example.resenasmix.exception.ResourceNotFoundException;
import com.example.resenasmix.model.Usuario;
import com.example.resenasmix.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<Usuario> listar() { return repository.findAll(); }

    @Transactional(readOnly = true)
    public Usuario obtenerPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id " + id));
    }

    public Usuario guardar(Usuario usuario) {
        if (usuario.getPassword() == null || usuario.getPassword().isBlank()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }
        usuario.setNombre(usuario.getNombre().trim());
        usuario.setUsername(usuario.getUsername().trim());
        usuario.setEmail(usuario.getEmail().trim().toLowerCase());
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        // El alta común del CRUD no permite autoasignar el rol administrador.
        usuario.setRole("ROLE_USER");
        return repository.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario datos) {
        Usuario usuario = obtenerPorId(id);
        usuario.setNombre(datos.getNombre());
        usuario.setEmail(datos.getEmail());
        // Este CRUD no permite elevar roles ni reemplazar hashes de contraseña.
        return repository.save(usuario);
    }

    public void eliminar(Long id) { repository.delete(obtenerPorId(id)); }
}
