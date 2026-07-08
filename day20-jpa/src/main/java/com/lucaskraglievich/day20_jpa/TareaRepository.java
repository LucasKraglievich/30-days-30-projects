package com.lucaskraglievich.day20_jpa;

import org.springframework.data.jpa.repository.JpaRepository;

// Esta interfaz es toda la "base de datos" que necesitamos
// JpaRepository<Tarea, Long> le dice a Spring:
// - Tarea = la entidad que maneja
// - Long = el tipo del ID
// Spring genera automáticamente: findAll, findById, save, deleteById, y muchos más
public interface TareaRepository extends JpaRepository<Tarea, Long> {
    // Sin código adicional — Spring genera todo por nosotros
}