# RBAC por Roles 🛡️

Control de acceso basado en roles (admin/user) sobre autenticación JWT.

## ✨ Features
- Registro con asignación de rol (admin/user)
- Login con JWT que incluye el rol del usuario
- Middleware de verificación de token
- Middleware de verificación de rol (reutilizable para cualquier rol)
- Ruta exclusiva para administradores

## Stack
Node.js · Express · bcrypt · jsonwebtoken

## Endpoints

| Método | Ruta                    | Descripción                              | Requiere      |
|--------|-------------------------|-------------------------------------------|---------------|
| POST   | `/api/registro`         | Crea usuario (body: `{ email, password, rol }`) | -        |
| POST   | `/api/login`            | Login, devuelve JWT con rol incluido      | -             |
| GET    | `/api/perfil`           | Perfil del usuario logueado               | Token válido  |
| GET    | `/api/admin/usuarios`   | Lista todos los usuarios                  | Token + rol admin |

## Conceptos aplicados

**RBAC (Role-Based Access Control)** — patrón de seguridad estándar: no solo autenticás "quién es" el usuario, sino que autorizás "qué puede hacer" según su rol.

**Middlewares encadenados** — `app.get(ruta, verificarToken, verificarRol('admin'), handler)`. Express ejecuta cada función en orden; si una falla, corta ahí sin llegar a la ruta final.

**Función que devuelve función** — `verificarRol(rolRequerido)` genera un middleware personalizado según el rol que se necesite, evitando repetir código para cada rol distinto.

## Cómo correrlo

```bash
npm install
node server.js
```

### Probar con PowerShell

```powershell
# Registrar admin
Invoke-RestMethod -Uri "http://localhost:3000/api/registro" -Method Post -ContentType "application/json" -Body '{"email":"admin@test.com","password":"123456","rol":"admin"}'

# Login y guardar token
$respuesta = Invoke-RestMethod -Uri "http://localhost:3000/api/login" -Method Post -ContentType "application/json" -Body '{"email":"admin@test.com","password":"123456"}'
$token = $respuesta.token

# Acceder a ruta de admin
Invoke-RestMethod -Uri "http://localhost:3000/api/admin/usuarios" -Headers @{"Authorization"="Bearer $token"}
```

---
Día 13 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
