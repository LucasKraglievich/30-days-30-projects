package com.lucaskraglievich.day30_capstone.repository;

import com.lucaskraglievich.day30_capstone.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}