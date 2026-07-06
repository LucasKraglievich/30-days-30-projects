package com.lucaskraglievich.day19_spring_api;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    static class Tarea {
        public Long id;
        public String titulo;
        public boolean completada;

        public Tarea(Long id, String titulo) {
            this.id = id;
            this.titulo = titulo;
            this.completada = false;
        }
    }

    private List<Tarea> tareas = new ArrayList<>();
    private Long siguienteId = 1L;

    @GetMapping
    public List<Tarea> getTareas() {
        return tareas;
    }

    @PostMapping
    public Tarea crearTarea(@RequestBody Tarea tareaRequest) {
        Tarea nuevaTarea = new Tarea(siguienteId++, tareaRequest.titulo);
        tareas.add(nuevaTarea);
        return nuevaTarea;
    }

    @GetMapping("/{id}")
    public Tarea getTarea(@PathVariable Long id) {
        return tareas.stream()
            .filter(t -> t.id.equals(id))
            .findFirst()
            .orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminarTarea(@PathVariable Long id) {
        tareas.removeIf(t -> t.id.equals(id));
    }
}