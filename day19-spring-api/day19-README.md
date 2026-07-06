# REST API con Spring Boot ☕

Primera API REST con Java y Spring Boot — el mismo CRUD de siempre, pero con el poder de Java.

## ✨ Features
- CRUD completo (GET, POST, DELETE)
- Anotaciones de Spring (`@RestController`, `@GetMapping`, `@PostMapping`, `@DeleteMapping`)
- Servidor Tomcat embebido en puerto 8080
- Datos en memoria con ArrayList

## 🛠 Stack
Java 21 · Spring Boot 3.5 · Maven · Apache Tomcat

## 📌 Endpoints

| Método | Ruta              | Descripción                          |
|--------|-------------------|----------------------------------------|
| GET    | `/api/tareas`     | Lista todas las tareas                |
| POST   | `/api/tareas`     | Crea una tarea (body: `{ "titulo": "" }`) |
| GET    | `/api/tareas/{id}`| Obtiene una tarea por ID              |
| DELETE | `/api/tareas/{id}`| Elimina una tarea                     |

## 💡 Conceptos aplicados

**`@RestController`** — le dice a Spring que esta clase maneja requests HTTP y devuelve JSON automáticamente (equivalente a `app.get()` + `res.json()` en Express).

**`@RequestMapping`** — define el prefijo de ruta para todos los endpoints del controller.

**`@PathVariable`** — extrae parámetros de la URL (equivalente a `req.params` en Express).

**`@RequestBody`** — convierte el JSON del body en un objeto Java (equivalente a `req.body` en Express).

## 🚀 Cómo correrlo

Requiere Java 21 y Maven instalados.

```bash
mvn spring-boot:run
```

Servidor en `http://localhost:8080`

---
Día 19 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
