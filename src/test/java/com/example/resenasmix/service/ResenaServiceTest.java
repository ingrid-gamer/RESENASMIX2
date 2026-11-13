package com.example.resenasmix.service;

import com.example.resenasmix.dto.ResenaRequestDTO;
import com.example.resenasmix.exception.ResourceNotFoundException;
import com.example.resenasmix.model.Resena;
import com.example.resenasmix.model.Usuario;
import com.example.resenasmix.model.Videojuego;
import com.example.resenasmix.repository.ResenaRepository;
import com.example.resenasmix.repository.UsuarioRepository;
import com.example.resenasmix.repository.VideojuegoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ResenaServiceTest {
    @Mock private ResenaRepository repository;
    @Mock private UsuarioRepository usuarioRepository;
    @Mock private VideojuegoRepository videojuegoRepository;
    @InjectMocks private ResenaService service;

    private Usuario usuario() {
        Usuario user = new Usuario();
        user.setId(1L); user.setNombre("Carlos"); user.setUsername("carlos");
        user.setPassword("hash"); user.setRole("ROLE_USER"); user.setEmail("carlos@mail.com");
        return user;
    }

    private Videojuego videojuego() {
        Videojuego game = new Videojuego();
        game.setId(2L); game.setTitulo("God of War"); game.setGenero("Acción"); game.setConsola("PS5");
        return game;
    }

    private ResenaRequestDTO dto() {
        ResenaRequestDTO dto = new ResenaRequestDTO();
        dto.setUsuarioId(999L); // Este ID no debe decidir quién publica la reseña.
        dto.setVideojuegoId(2L); dto.setComentario("Muy buen juego"); dto.setCalificacion(5);
        return dto;
    }

    @Test
    void guardarAsociaAutorObtenidoDesdeLaSesion() {
        Usuario user = usuario();
        Videojuego game = videojuego();
        when(usuarioRepository.findByUsername("carlos")).thenReturn(Optional.of(user));
        when(videojuegoRepository.findById(2L)).thenReturn(Optional.of(game));
        when(repository.save(any(Resena.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Resena result = service.guardar(dto(), "carlos");

        assertEquals("Muy buen juego", result.getComentario());
        assertEquals(5, result.getCalificacion());
        assertSame(user, result.getUsuario());
        assertSame(game, result.getVideojuego());
        verify(usuarioRepository).findByUsername("carlos");
        verify(usuarioRepository, never()).findById(anyLong());
    }

    @Test
    void guardarFallaSiNoExisteElUsuarioAutenticado() {
        when(usuarioRepository.findByUsername("desconocido")).thenReturn(Optional.empty());
        ResourceNotFoundException error = assertThrows(ResourceNotFoundException.class,
                () -> service.guardar(dto(), "desconocido"));
        assertEquals("Usuario autenticado no encontrado", error.getMessage());
    }

    @Test
    void guardarFallaSiNoExisteElVideojuego() {
        when(usuarioRepository.findByUsername("carlos")).thenReturn(Optional.of(usuario()));
        when(videojuegoRepository.findById(2L)).thenReturn(Optional.empty());
        ResourceNotFoundException error = assertThrows(ResourceNotFoundException.class,
                () -> service.guardar(dto(), "carlos"));
        assertEquals("Videojuego no encontrado con id 2", error.getMessage());
    }

    @Test
    void actualizarNoCambiaElAutorOriginal() {
        Usuario original = usuario();
        Resena existing = new Resena();
        existing.setId(10L); existing.setUsuario(original); existing.setVideojuego(videojuego());
        existing.setComentario("Texto anterior"); existing.setCalificacion(3);
        when(repository.findById(10L)).thenReturn(Optional.of(existing));
        when(videojuegoRepository.findById(2L)).thenReturn(Optional.of(videojuego()));
        when(repository.save(existing)).thenReturn(existing);

        ResenaRequestDTO update = dto();
        update.setComentario("Comentario actualizado");
        Resena result = service.actualizar(10L, update);

        assertEquals("Comentario actualizado", result.getComentario());
        assertSame(original, result.getUsuario());
        verify(repository).save(existing);
        verify(usuarioRepository, never()).findById(anyLong());
    }

    @Test
    void eliminarBorraResenaExistente() {
        Resena existing = new Resena(); existing.setId(10L);
        when(repository.findById(10L)).thenReturn(Optional.of(existing));
        service.eliminar(10L);
        verify(repository).delete(existing);
    }
}
