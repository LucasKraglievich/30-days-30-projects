package com.lucaskraglievich.day21_security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioRepository repository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // POST /api/auth/registro
    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email ya registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRol(request.getRol() != null ? request.getRol() : "user");
        repository.save(usuario);
        return ResponseEntity.ok("Usuario registrado con éxito");
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario request) {
        return repository.findByEmail(request.getEmail())
            .filter(u -> passwordEncoder.matches(request.getPassword(), u.getPassword()))
            .map(u -> ResponseEntity.ok(jwtUtil.generarToken(u.getEmail())))
            .orElse(ResponseEntity.status(401).body(null));
    }

// GET /api/perfil — ruta protegida
    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extraerEmail(token);
        return ResponseEntity.ok("Bienvenido: " + email);
    }
}