package com.lucaskraglievich.day30_capstone.repository;

import com.lucaskraglievich.day30_capstone.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByUsuarioEmail(String usuarioEmail);
}