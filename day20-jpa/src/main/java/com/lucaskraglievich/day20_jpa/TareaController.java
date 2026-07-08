package com.lucaskraglievich.day20_jpa;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    // Spring inyecta el repositorio automáticamente — no necesitamos "new TareaRepository()"
    private final TareaRepository repository;

    public TareaController(TareaRepository repository) {
        this.repository = repository;
    }

    // GET /api/tareas — trae todas las tareas de la DB
    @GetMapping
    public List<Tarea> getTareas() {
        return repository.findAll();
    }

    // POST /api/tareas — crea una tarea nueva y la guarda en la DB
    @PostMapping
    public Tarea crearTarea(@RequestBody Tarea tarea) {
        return repository.save(tarea);
    }

    // PUT /api/tareas/{id} — actualiza una tarea existente
    @PutMapping("/{id}")
    public ResponseEntity<Tarea> actualizarTarea(@PathVariable Long id, @RequestBody Tarea tareaRequest) {
        return repository.findById(id)
            .map(tarea -> {
                tarea.setTitulo(tareaRequest.getTitulo());
                tarea.setCompletada(tareaRequest.isCompletada());
                return ResponseEntity.ok(repository.save(tarea));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/tareas/{id} — elimina una tarea
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTarea(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}