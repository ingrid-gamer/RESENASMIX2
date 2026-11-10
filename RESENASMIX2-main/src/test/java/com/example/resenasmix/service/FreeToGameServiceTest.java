package com.example.resenasmix.service;

import com.example.resenasmix.dto.JuegoExternoDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FreeToGameServiceTest {

    @Mock
    private RestTemplate restTemplate;

    private FreeToGameService service;

    private final String baseUrl = "https://www.freetogame.com/api/games";

    @BeforeEach
    void setUp() {
        service = new FreeToGameService(restTemplate, baseUrl);
    }

    @Test
    void listarJuegosExternosRetornaLista() {
        JuegoExternoDTO juego = new JuegoExternoDTO(
                1L,
                "Fortnite",
                "https://example.com/thumb.jpg",
                "Battle royale",
                "Shooter",
                "PC",
                "Epic Games",
                "Epic Games",
                "2017-07-21",
                "https://www.freetogame.com/fortnite"
        );

        when(restTemplate.getForObject(baseUrl, JuegoExternoDTO[].class))
                .thenReturn(new JuegoExternoDTO[]{juego});

        List<JuegoExternoDTO> resultado = service.listarJuegosExternos();

        assertEquals(1, resultado.size());
        assertEquals("Fortnite", resultado.get(0).getTitle());
        verify(restTemplate).getForObject(baseUrl, JuegoExternoDTO[].class);
    }

    @Test
    void listarJuegosExternosRetornaListaVaciaCuandoApiDevuelveNull() {
        when(restTemplate.getForObject(baseUrl, JuegoExternoDTO[].class))
                .thenReturn(null);

        List<JuegoExternoDTO> resultado = service.listarJuegosExternos();

        assertNotNull(resultado);
        assertTrue(resultado.isEmpty());
        verify(restTemplate).getForObject(baseUrl, JuegoExternoDTO[].class);
    }
}