package com.example.resenasmix.service;

import com.example.resenasmix.dto.CompraRequestDTO;
import com.example.resenasmix.dto.CompraResponseDTO;
import com.example.resenasmix.exception.ResourceNotFoundException;
import com.example.resenasmix.model.Compra;
import com.example.resenasmix.model.Usuario;
import com.example.resenasmix.model.Videojuego;
import com.example.resenasmix.repository.VideojuegoRepository;
import com.example.resenasmix.repository.CompraRepository;
import com.example.resenasmix.repository.UsuarioRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CompraService {
    private static final Logger log = LoggerFactory.getLogger(CompraService.class);
    private final CompraRepository compraRepository;
    private final UsuarioRepository usuarioRepository;
    private final ObjectMapper objectMapper;
    private final VideojuegoRepository videojuegoRepository;

    public CompraService(CompraRepository compraRepository, UsuarioRepository usuarioRepository, ObjectMapper objectMapper, VideojuegoRepository videojuegoRepository) {
        this.compraRepository = compraRepository;
        this.usuarioRepository = usuarioRepository;
        this.objectMapper = objectMapper;
        this.videojuegoRepository = videojuegoRepository;
    }

    @Transactional
    public CompraResponseDTO registrar(String username, CompraRequestDTO request) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario autenticado no encontrado"));

        BigDecimal total = BigDecimal.ZERO;
        List<Map<String, Object>> detalle = new ArrayList<>();
        for (CompraRequestDTO.Item item : request.getItems()) {
            Videojuego videojuego = videojuegoRepository.findById(item.getVideojuegoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Videojuego no encontrado con id " + item.getVideojuegoId()));
            BigDecimal precio = videojuego.getPrecio() == null ? BigDecimal.ZERO : videojuego.getPrecio();
            total = total.add(precio.multiply(BigDecimal.valueOf(item.getCantidad())));
            Map<String, Object> linea = new LinkedHashMap<>();
            linea.put("videojuegoId", videojuego.getId());
            linea.put("titulo", videojuego.getTitulo());
            linea.put("cantidad", item.getCantidad());
            linea.put("precioUnitario", precio);
            detalle.add(linea);
        }

        Compra compra = new Compra();
        compra.setUsuario(usuario);
        compra.setNombre(request.getNombre());
        compra.setEmail(request.getEmail());
        compra.setDireccion(request.getDireccion());
        compra.setEntrega(request.getEntrega());
        compra.setTotal(total);
        try {
            compra.setDetalleJson(objectMapper.writeValueAsString(detalle));
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("No fue posible procesar el detalle de la compra", e);
        }

        Compra guardada = compraRepository.save(compra);
        log.info("Compra simulada registrada id={} usuario={} total={} estado={}",
                guardada.getId(), username, total, guardada.getEstado());
        return toResponse(guardada);
    }

    @Transactional(readOnly = true)
    public List<CompraResponseDTO> listarPropias(String username) {
        return compraRepository.findByUsuarioUsernameOrderByFechaCreacionDesc(username)
                .stream().map(this::toResponse).toList();
    }

    private CompraResponseDTO toResponse(Compra compra) {
        return new CompraResponseDTO(compra.getId(), compra.getTotal(), compra.getEstado(), compra.getFechaCreacion());
    }
}
