# Migraciones de Base de Datos 📋

Sistema de migraciones versionadas para PostgreSQL con node-pg-migrate.

## ✨ Features
- Migraciones versionadas (up/down)
- Registro automático de migraciones aplicadas
- Reversión de cambios con `migrate:down`
- Ejemplo real: crear tabla y agregar columna en migraciones separadas

## Stack
Node.js · PostgreSQL · node-pg-migrate · dotenv

## Migraciones incluidas

| # | Archivo | Descripción |
|---|---------|-------------|
| 1 | `1_crear_tabla_tareas.js` | Crea la tabla `tareas` con id, titulo, completada, creado_en |
| 2 | `2_agregar_descripcion.js` | Agrega la columna `descripcion` a la tabla |

## Conceptos aplicados

**Migraciones versionadas** — cada cambio en la base de datos es un archivo numerado con funciones `up` (aplicar) y `down` (revertir). node-pg-migrate registra en la tabla `pgmigrations` qué ya se aplicó.

**Por qué no ALTER TABLE directo** — en producción con datos reales, los cambios manuales no son reproducibles ni revertibles. Las migraciones son como "git para el schema".

**dotenv** — guarda credenciales sensibles (contraseña de la DB) en un archivo `.env` que no se sube a GitHub.

## Cómo correrlo

Requiere PostgreSQL instalado. Crear base de datos `migraciones_db` antes de correr.

```bash
npm install

# Aplicar todas las migraciones pendientes
npm run migrate:up

# Revertir la última migración
npm run migrate:down
```

---
Día 17 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
