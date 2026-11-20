package com.example.resenasmix.config;

import com.example.resenasmix.model.Usuario;
import com.example.resenasmix.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final String username;
    private final String password;
    private final String nombre;
    private final String email;

    public AdminUserInitializer(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
                                @Value("${app.admin.username:}") String username,
                                @Value("${app.admin.password:}") String password,
                                @Value("${app.admin.nombre:Administrador}") String nombre,
                                @Value("${app.admin.email:}") String email) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.username = username;
        this.password = password;
        this.nombre = nombre;
        this.email = email;
    }

    @Override
    public void run(String... args) {
        if (username.isBlank() || password.isBlank() || email.isBlank()) {
            log.info("No se configuró administrador inicial (APP_ADMIN_USERNAME/PASSWORD/EMAIL)");
            return;
        }
        if (password.length() < 8) {
            throw new IllegalStateException("APP_ADMIN_PASSWORD debe tener al menos 8 caracteres");
        }
        if (usuarioRepository.findByUsername(username).isPresent()) {
            log.info("El usuario administrador configurado ya existe; no se modificó su rol ni contraseña");
            return;
        }
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalStateException("APP_ADMIN_EMAIL ya está asociado a otra cuenta");
        }

        Usuario admin = new Usuario();
        admin.setNombre(nombre);
        admin.setUsername(username);
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole("ROLE_ADMIN");
        usuarioRepository.save(admin);
        log.info("Se creó el usuario administrador configurado mediante variables de entorno");
    }
}
