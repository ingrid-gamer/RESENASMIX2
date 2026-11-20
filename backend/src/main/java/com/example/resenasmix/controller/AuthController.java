package com.example.resenasmix.controller;

import com.example.resenasmix.dto.AuthRequest;
import com.example.resenasmix.dto.AuthResponse;
import com.example.resenasmix.dto.RegisterRequest;
import com.example.resenasmix.model.Usuario;
import com.example.resenasmix.repository.UsuarioRepository;
import com.example.resenasmix.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                          UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        String username = request.getUsername().trim();
        String email = request.getEmail().trim().toLowerCase();
        if (usuarioRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El nombre de usuario ya existe");
        }
        if (usuarioRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre().trim());
        usuario.setUsername(username);
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        // El registro público nunca permite que el cliente se asigne privilegios.
        usuario.setRole("ROLE_USER");
        usuarioRepository.save(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            String username = authentication.getName();
            Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow();
            return ResponseEntity.ok(toAuthResponse(usuario));
        } catch (BadCredentialsException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Usuario o contraseña incorrectos"));
        }
    }

    /** Renueva un JWT vigente. No acepta tokens vencidos ni firmas inválidas. */
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestHeader(value = "Authorization", required = false) String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Falta el encabezado Authorization: Bearer");
        }

        String oldToken = authorization.substring(7).trim();
        if (oldToken.isEmpty() || !jwtUtil.validateToken(oldToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("El token es inválido o ha expirado. Inicia sesión nuevamente.");
        }

        String username = jwtUtil.extractUsername(oldToken);
        Usuario usuario = usuarioRepository.findByUsername(username).orElse(null);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("La cuenta asociada al token ya no existe");
        }
        return ResponseEntity.ok(toAuthResponse(usuario));
    }

    private AuthResponse toAuthResponse(Usuario usuario) {
        String token = jwtUtil.generateToken(usuario.getUsername(), usuario.getRole());
        return new AuthResponse(token, usuario.getId(), usuario.getUsername(), usuario.getNombre(),
                usuario.getEmail(), usuario.getRole(), jwtUtil.getExpirationSeconds());
    }
}
