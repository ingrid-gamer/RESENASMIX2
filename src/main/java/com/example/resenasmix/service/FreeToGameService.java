package com.example.resenasmix.service;

import com.example.resenasmix.dto.JuegoExternoDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class FreeToGameService {

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public FreeToGameService(RestTemplate restTemplate,
                             @Value("${external.api.base-url}") String baseUrl) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
    }

    public List<JuegoExternoDTO> listarJuegosExternos() {
        JuegoExternoDTO[] respuesta = restTemplate.getForObject(baseUrl, JuegoExternoDTO[].class);
        return respuesta == null ? List.of() : Arrays.asList(respuesta);
    }
}