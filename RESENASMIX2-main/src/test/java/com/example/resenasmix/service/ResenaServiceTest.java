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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResenaServiceTest {

    @Mock
    private ResenaRepository repository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private VideojuegoRepository videojuegoRepository;

    @InjectMocks
    private ResenaService service;

    @Test
    void guardarCreaResenaCorrectamente() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Carlos");
        usuario.setUsername("carlos");
        usuario.setPassword("123");
        usuario.setRole("ROLE_USER");
        usuario.setEmail("carlos@mail.com");

        Videojuego videojuego = new Videojuego();
        videojuego.setId(2L);
        videojuego.setTitulo("God of War");
        videojuego.setGenero("Acción");
        videojuego.setConsola("PS5");

        ResenaRequestDTO dto = new ResenaRequestDTO();
        dto.setUsuarioId(1L);
        dto.setVideojuegoId(2L);
        dto.setComentario("Muy buen juego");
        dto.setCalificacion(5);

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(videojuegoRepository.findById(2L)).thenReturn(Optional.of(videojuego));
        when(repository.save(any(Resena.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Resena resultado = service.guardar(dto);

        assertEquals("Muy buen juego", resultado.getComentario());
        assertEquals(5, resultado.getCalificacion());
        assertEquals(usuario, resultado.getUsuario());
        assertEquals(videojuego, resultado.getVideojuego());
    }

    @Test
    void actualizarModificaResenaExistente() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Carlos");
        usuario.setUsername("carlos");
        usuario.setPassword("123");
        usuario.setRole("ROLE_USER");
        usuario.setEmail("carlos@mail.com");

        Videojuego videojuego = new Videojuego();
        videojuego.setId(2L);
        videojuego.setTitulo("God of War");
        videojuego.setGenero("Acción");
        videojuego.setConsola("PS5");

        Resena existente = new Resena();
        existente.setId(10L);
        existente.setComentario("Viejo comentario");
        existente.setCalificacion(3);
        existente.setUsuario(usuario);
        existente.setVideojuego(videojuego);

        ResenaRequestDTO dto = new ResenaRequestDTO();
        dto.setUsuarioId(1L);
        dto.setVideojuegoId(2L);
        dto.setComentario("Comentario actualizado");
        dto.setCalificacion(5);

        when(repository.findById(10L)).thenReturn(Optional.of(existente));
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(videojuegoRepository.findById(2L)).thenReturn(Optional.of(videojuego));
        when(repository.save(existente)).thenReturn(existente);

        Resena resultado = service.actualizar(10L, dto);

        assertEquals("Comentario actualizado", resultado.getComentario());
        assertEquals(5, resultado.getCalificacion());
        verify(repository, times(2)).findById(10L);
        verify(repository).save(existente);
    }

    @Test
    void guardarLanzaExcepcionCuandoUsuarioNoExiste() {
        ResenaRequestDTO dto = new ResenaRequestDTO();
        dto.setUsuarioId(1L);
        dto.setVideojuegoId(2L);
        dto.setComentario("Muy buen juego");
        dto.setCalificacion(5);

        when(usuarioRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> service.guardar(dto)
        );

        assertEquals("Usuario no encontrado con id 1", ex.getMessage());
    }

    @Test
    void guardarLanzaExcepcionCuandoVideojuegoNoExiste() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Carlos");
        usuario.setUsername("carlos");
        usuario.setPassword("123");
        usuario.setRole("ROLE_USER");
        usuario.setEmail("carlos@mail.com");

        ResenaRequestDTO dto = new ResenaRequestDTO();
        dto.setUsuarioId(1L);
        dto.setVideojuegoId(2L);
        dto.setComentario("Muy buen juego");
        dto.setCalificacion(5);

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(videojuegoRepository.findById(2L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> service.guardar(dto)
        );

        assertEquals("Videojuego no encontrado con id 2", ex.getMessage());
    }

    @Test
    void eliminarBorraResena() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);

        Videojuego videojuego = new Videojuego();
        videojuego.setId(2L);

        Resena resena = new Resena();
        resena.setId(10L);
        resena.setComentario("Muy buen juego");
        resena.setCalificacion(5);
        resena.setUsuario(usuario);
        resena.setVideojuego(videojuego);

        when(repository.findById(10L)).thenReturn(Optional.of(resena));

        service.eliminar(10L);

        verify(repository).findById(10L);
        verify(repository).delete(resena);
    }
}