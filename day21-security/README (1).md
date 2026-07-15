# JPA + PostgreSQL con Spring Boot 

API REST con persistencia real usando Spring Data JPA e Hibernate.

## ✨ Features
- CRUD completo con persistencia en PostgreSQL
- Sin SQL manual — JPA genera las queries automáticamente
- Hibernate crea/actualiza la tabla al arrancar (`ddl-auto=update`)
- Pool de conexiones con HikariCP

## Stack
Java 21 · Spring Boot 3.5 · Spring Data JPA · Hibernate · PostgreSQL

## Endpoints

| Método | Ruta              | Descripción                          |
|--------|-------------------|----------------------------------------|
| GET    | `/api/tareas`     | Lista todas las tareas                |
| POST   | `/api/tareas`     | Crea una tarea (body: `{ "titulo": "" }`) |
| PUT    | `/api/tareas/{id}`| Actualiza una tarea                   |
| DELETE | `/api/tareas/{id}`| Elimina una tarea                     |

## Conceptos aplicados

**`@Entity`** — marca una clase Java como tabla en la base de datos. Hibernate genera el SQL de creación automáticamente.

**`@GeneratedValue(strategy = GenerationType.IDENTITY)`** — equivalente a `SERIAL PRIMARY KEY` en SQL, el ID se genera solo.

**`JpaRepository`** — interfaz que provee `findAll()`, `findById()`, `save()`, `deleteById()` sin escribir ningún SQL.

**`ResponseEntity`** — permite controlar el status HTTP de la respuesta (200, 204, 404) de forma explícita.

## Cómo correrlo

Requiere PostgreSQL corriendo con una base de datos `tareas_db`.

```bash
# Configurar src/main/resources/application.properties con tu contraseña
mvn spring-boot:run
```

---
Día 20 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
