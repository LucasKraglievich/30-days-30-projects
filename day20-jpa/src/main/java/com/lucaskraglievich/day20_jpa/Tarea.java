package com.lucaskraglievich.day20_jpa;

import jakarta.persistence.*;

// @Entity le dice a JPA que esta clase representa una tabla en la base de datos
// Hibernate va a crear la tabla "tareas" automáticamente
@Entity
@Table(name = "tareas")
public class Tarea {

    // @Id marca el campo como clave primaria
    // @GeneratedValue hace que el ID se genere automáticamente (como AUTOINCREMENT)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column
    private boolean completada = false;

    // Constructor vacío — requerido por JPA
    public Tarea() {}

    public Tarea(String titulo) {
        this.titulo = titulo;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public boolean isCompletada() { return completada; }
    public void setCompletada(boolean completada) { this.completada = completada; }
}