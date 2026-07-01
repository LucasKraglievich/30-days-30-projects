# API con PostgreSQL 🐘

API REST de tareas conectada a PostgreSQL — base de datos de producción real.

## ✨ Features
- CRUD completo (GET, POST, PUT, DELETE)
- Conexión a PostgreSQL con Pool de conexiones
- Tipos de datos reales: BOOLEAN, SERIAL, TEXT
- Prepared statements con `$1`, `$2` para prevenir SQL injection

## Stack
Node.js · Express · PostgreSQL · node-postgres (pg)

## Endpoints

| Método | Ruta              | Descripción                          |
|--------|-------------------|----------------------------------------|
| GET    | `/api/tareas`     | Lista todas las tareas                |
| POST   | `/api/tareas`     | Crea una tarea (body: `{ titulo }`)   |
| PUT    | `/api/tareas/:id` | Actualiza una tarea                   |
| DELETE | `/api/tareas/:id` | Elimina una tarea                     |

## Conceptos aplicados

**Pool de conexiones** — maneja múltiples conexiones simultáneas eficientemente. A diferencia de una conexión directa, el Pool reutiliza conexiones existentes en vez de abrir una nueva por cada request.

**PostgreSQL vs SQLite** — PostgreSQL corre como servicio real, soporta tipos de datos más ricos (BOOLEAN real, timestamps, arrays), y está diseñado para múltiples usuarios simultáneos en producción.

**RETURNING \*** — cláusula de PostgreSQL que devuelve la fila insertada/actualizada, evitando hacer un SELECT adicional.

## Cómo correrlo

Requiere PostgreSQL instalado y corriendo. Crear base de datos `tareas_db` antes de iniciar.

```bash
npm install
node server.js
```

---
Día 16 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
