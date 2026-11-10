package com.example.resenasmix.service;

import com.example.resenasmix.exception.ResourceNotFoundException;
import com.example.resenasmix.model.Usuario;
import com.example.resenasmix.repository.UsuarioRepository;
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
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository repository;

    @InjectMocks
    private UsuarioService service;

    @Test
    void listarDevuelveUsuarios() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Carlos");
        usuario.setEmail("carlos@mail.com");

        when(repository.findAll()).thenReturn(List.of(usuario));

        List<Usuario> resultado = service.listar();

        assertEquals(1, resultado.size());
        assertEquals("Carlos", resultado.get(0).getNombre());
        verify(repository).findAll();
    }

    @Test
    void obtenerPorIdDevuelveUsuario() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Carlos");
        usuario.setEmail("carlos@mail.com");

        when(repository.findById(1L)).thenReturn(Optional.of(usuario));

        Usuario resultado = service.obtenerPorId(1L);

        assertNotNull(resultado);
        assertEquals("Carlos", resultado.getNombre());
        verify(repository).findById(1L);
    }

    @Test
    void guardarDevuelveUsuarioGuardado() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Carlos");
        usuario.setEmail("carlos@mail.com");

        when(repository.save(usuario)).thenReturn(usuario);

        Usuario resultado = service.guardar(usuario);

        assertEquals("Carlos", resultado.getNombre());
        assertEquals("carlos@mail.com", resultado.getEmail());
        verify(repository).save(usuario);
    }

    @Test
    void actualizarModificaNombreYEmail() {
        Usuario existente = new Usuario();
        existente.setId(1L);
        existente.setNombre("Nombre viejo");
        existente.setEmail("viejo@mail.com");

        Usuario datos = new Usuario();
        datos.setNombre("Nombre nuevo");
        datos.setEmail("nuevo@mail.com");

        when(repository.findById(1L)).thenReturn(Optional.of(existente));
        when(repository.save(existente)).thenReturn(existente);

        Usuario resultado = service.actualizar(1L, datos);

        assertEquals("Nombre nuevo", resultado.getNombre());
        assertEquals("nuevo@mail.com", resultado.getEmail());
        verify(repository).findById(1L);
        verify(repository).save(existente);
    }

    @Test
    void eliminarBorraUsuario() {
        Usuario existente = new Usuario();
        existente.setId(1L);
        existente.setNombre("Carlos");
        existente.setEmail("carlos@mail.com");

        when(repository.findById(1L)).thenReturn(Optional.of(existente));

        service.eliminar(1L);

        verify(repository).findById(1L);
        verify(repository).delete(existente);
    }

    @Test
    void obtenerPorIdLanzaExcepcionCuandoNoExiste() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        ResourceNotFoundException ex = assertThrows(
                ResourceNotFoundException.class,
                () -> service.obtenerPorId(99L)
        );

        assertEquals("Usuario no encontrado con id 99", ex.getMessage());
    }
}