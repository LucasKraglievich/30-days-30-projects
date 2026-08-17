# Día 30 — Task Manager API (Capstone Final) 🏁

## Sobre el proyecto

El cierre del reto: una API de gestión de tareas que combina, en un solo
proyecto, las piezas más fuertes construidas por separado a lo largo de
los últimos días. No es un concepto nuevo — es la prueba de que todo lo
anterior se puede integrar en un backend real y coherente.

## Stack

- Java 21
- Spring Boot 4.1.0
- Spring Web · Spring Security · Spring Data JPA
- H2 (base en memoria)
- JWT (jjwt)
- Bean Validation
- springdoc-openapi (Swagger)
- Spring Boot Actuator

## De qué día viene cada pieza

| Funcionalidad | Día de origen |
|---|---|
| Autenticación con JWT | 11 / 21 |
| Persistencia con JPA | 20 |
| Validación + manejo global de excepciones | 24 |
| Documentación con Swagger | 25 |
| Health check con Actuator | 27 |

## Endpoints

| Método | Ruta | Protegido | Descripción |
|---|---|---|---|
| POST | `/api/auth/registrar` | No | Crea un usuario nuevo (password hasheado con BCrypt) |
| POST | `/api/auth/login` | No | Devuelve un JWT si las credenciales son válidas |
| GET | `/api/tareas` | Sí (JWT) | Lista las tareas del usuario autenticado |
| POST | `/api/tareas` | Sí (JWT) | Crea una tarea nueva, asociada al usuario del token |
| PATCH | `/api/tareas/{id}/completar` | Sí (JWT) | Marca una tarea como completada |

## Cómo correrlo

```bash
mvn spring-boot:run
```

Documentación interactiva: `http://localhost:8080/swagger-ui/index.html`
Health check: `http://localhost:8080/actuator/health`

## Flujo probado de punta a punta

```
POST /api/auth/registrar → "Usuario registrado correctamente."
POST /api/auth/login     → { "token": "eyJhbGci..." }
POST /api/tareas (con Bearer token) → tarea creada, asociada al usuario
```

Cada tarea queda ligada al email del usuario extraído del JWT — un
usuario no puede ver ni completar tareas de otro (verificado también en
`PATCH /completar`, que devuelve 403 si no coincide el dueño).

## Qué aprendí (de todo el reto, no solo este día)

Este proyecto es la mejor prueba de que un backend jr no se define por
saber un framework, sino por saber **combinar** piezas: autenticación,
persistencia, validación, documentación y observabilidad trabajando
juntas, no como demos aisladas. El camino hasta acá —desde JS puro con
`fetch` hasta esto— fue subir un peldaño de complejidad por día, sin
saltar directo a lo difícil.

## Cierre del reto

Con este día se completan los **30 días, 30 proyectos**: arrancando con
HTML/CSS/JS puro, pasando por Node.js/Express, y cerrando con Java/Spring
Boot — REST, GraphQL, JWT, testing, caching, mensajería, CI/CD y este
capstone final.
