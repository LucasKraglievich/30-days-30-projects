package com.lucaskraglievich.day30_capstone.security;

import com.lucaskraglievich.day30_capstone.model.Usuario;
import com.lucaskraglievich.day30_capstone.repository.UsuarioRepository;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    public record AuthRequest(@NotBlank String email, @NotBlank String password) {}

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody AuthRequest request) {
        if (usuarioRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado.");
        }
        Usuario usuario = new Usuario(request.email(), passwordEncoder.encode(request.password()));
        usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado correctamente.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        var usuarioOpt = usuarioRepository.findByEmail(request.email());

        if (usuarioOpt.isEmpty() || !passwordEncoder.matches(request.password(), usuarioOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas.");
        }

        String token = jwtUtil.generarToken(usuarioOpt.get().getEmail());
        return ResponseEntity.ok(java.util.Map.of("token", token));
    }
}