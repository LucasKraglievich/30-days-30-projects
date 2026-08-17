package com.lucaskraglievich.day30_capstone.controller;

import com.lucaskraglievich.day30_capstone.model.Tarea;
import com.lucaskraglievich.day30_capstone.repository.TareaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    @Autowired private TareaRepository tareaRepository;

    @GetMapping
    public List<Tarea> listar(Authentication auth) {
        return tareaRepository.findByUsuarioEmail(auth.getName());
    }

    @PostMapping
    public ResponseEntity<Tarea> crear(@Valid @RequestBody Tarea tarea, Authentication auth) {
        tarea.setUsuarioEmail(auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(tareaRepository.save(tarea));
    }

    @PatchMapping("/{id}/completar")
    public ResponseEntity<Tarea> completar(@PathVariable Long id, Authentication auth) {
        Tarea tarea = tareaRepository.findById(id).orElseThrow();
        if (!tarea.getUsuarioEmail().equals(auth.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        tarea.setCompletada(true);
        return ResponseEntity.ok(tareaRepository.save(tarea));
    }
}