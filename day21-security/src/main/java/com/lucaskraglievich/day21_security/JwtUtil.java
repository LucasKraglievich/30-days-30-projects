package com.lucaskraglievich.day21_security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

// @Component le dice a Spring que esta clase es un componente
// que puede ser inyectado en otras clases
@Component
public class JwtUtil {

    // Clave secreta para firmar los tokens
    private final Key clave = Keys.hmacShaKeyFor(
        "mi-clave-secreta-super-segura-2026-abc123".getBytes()
    );

    private final long EXPIRACION = 1000 * 60 * 60; // 1 hora en milisegundos

    // Genera un token JWT con el email del usuario
    public String generarToken(String email) {
        return Jwts.builder()
            .subject(email)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + EXPIRACION))
            .signWith(clave)
            .compact();
    }

    // Extrae el email del token
    public String extraerEmail(String token) {
        return Jwts.parser()
            .verifyWith(Keys.hmacShaKeyFor("mi-clave-secreta-super-segura-2026-abc123".getBytes()))
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    // Verifica si el token es válido
    public boolean validarToken(String token) {
        try {
            extraerEmail(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}