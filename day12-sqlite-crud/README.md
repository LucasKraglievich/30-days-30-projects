# CRUD con SQLite 

API REST de tareas con persistencia real en base de datos SQLite.

## ✨ Features
- CRUD completo (GET, POST, PUT, DELETE)
- Persistencia real los datos sobreviven al reinicio del servidor
- Base de datos en un solo archivo (`tareas.db`), sin servidor externo
- Prepared statements para prevenir SQL injection

## Stack
Node.js · Express · better-sqlite3

## Endpoints

| Método | Ruta              | Descripción                          |
|--------|-------------------|----------------------------------------|
| GET    | `/api/tareas`     | Lista todas las tareas                |
| POST   | `/api/tareas`     | Crea una tarea (body: `{ titulo }`)   |
| PUT    | `/api/tareas/:id` | Actualiza una tarea                   |
| DELETE | `/api/tareas/:id` | Elimina una tarea                     |

## Conceptos aplicados

**Persistencia vs memoria** — a diferencia del día 10 (array en memoria), acá los datos viven en un archivo `.db` en disco. Si el servidor se reinicia, los datos siguen ahí.

**SQL básico** — `CREATE TABLE`, `INSERT INTO`, `SELECT`, `UPDATE`, `DELETE`. El lenguaje universal para hablar con bases de datos relacionales.

**Prepared statements** — el uso de `?` como placeholder en las queries previene SQL injection, evitando que un input malicioso modifique la consulta SQL real.

## Cómo correrlo

```bash
npm install
node server.js
```

El archivo `tareas.db` se crea automáticamente al arrancar el servidor por primera vez.

### Probar con PowerShell

```powershell
# Crear tarea
Invoke-RestMethod -Uri "http://localhost:3000/api/tareas" -Method Post -ContentType "application/json" -Body '{"titulo":"Aprender SQLite"}'

# Listar tareas
Invoke-RestMethod -Uri "http://localhost:3000/api/tareas"
```

---
Día 12 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
