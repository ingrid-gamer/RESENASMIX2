package com.example.resenasmix.service;

import com.example.resenasmix.exception.ResourceNotFoundException;
import com.example.resenasmix.model.Videojuego;
import com.example.resenasmix.repository.VideojuegoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VideojuegoServiceTest {

    @Mock
    private VideojuegoRepository repository;

    @InjectMocks
    private VideojuegoService service;

    @Test
    void listarDevuelveVideojuegos() {
        Videojuego videojuego = new Videojuego();
        videojuego.setId(1L);
        videojuego.setTitulo("Zelda");
        videojuego.setGenero("Aventura");
        videojuego.setConsola("Switch");

        when(repository.findAll()).thenReturn(List.of(videojuego));

        List<Videojuego> resultado = service.listar();

        assertEquals(1, resultado.size());
        assertEquals("Zelda", resultado.get(0).getTitulo());
        verify(repository).findAll();
    }

    @Test
    void guardarDevuelveVideojuegoGuardado() {
        Videojuego videojuego = new Videojuego();
        videojuego.setTitulo("Zelda");
        videojuego.setGenero("Aventura");
        videojuego.setConsola("Switch");

        when(repository.save(videojuego)).thenReturn(videojuego);

        Videojuego resultado = service.guardar(videojuego);

        assertEquals("Zelda", resultado.getTitulo());
        verify(repository).save(videojuego);
    }

    @Test
    void obtenerPorIdDevuelveVideojuego() {
        Videojuego videojuego = new Videojuego();
        videojuego.setId(1L);
        videojuego.setTitulo("Zelda");
        videojuego.setGenero("Aventura");
        videojuego.setConsola("Switch");

        when(repository.findById(1L)).thenReturn(Optional.of(videojuego));

        Videojuego resultado = service.obtenerPorId(1L);

        assertNotNull(resultado);
        assertEquals("Zelda", resultado.getTitulo());
        assertEquals("Aventura", resultado.getGenero());
        assertEquals("Switch", resultado.getConsola());
        verify(repository).findById(1L);
    }

    @Test
    void obtenerPorIdLanzaExcepcionCuandoNoExiste() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> service.obtenerPorId(99L)
        );

        assertEquals("Videojuego no encontrado con id 99", ex.getMessage());
    }

    @Test
    void eliminarBorraVideojuego() {
        Videojuego videojuego = new Videojuego();
        videojuego.setId(1L);
        videojuego.setTitulo("Zelda");
        videojuego.setGenero("Aventura");
        videojuego.setConsola("Switch");

        when(repository.findById(1L)).thenReturn(Optional.of(videojuego));

        service.eliminar(1L);

        verify(repository).findById(1L);
        verify(repository).delete(videojuego);
    }
}