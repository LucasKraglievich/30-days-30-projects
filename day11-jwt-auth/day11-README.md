# Autenticación con JWT 

API con registro, login y rutas protegidas usando JSON Web Tokens.

## ✨ Features
- Registro de usuarios con contraseña hasheada (bcrypt)
- Login con validación de credenciales
- Generación de JWT al iniciar sesión
- Middleware de autenticación para proteger rutas
- Token con expiración de 1 hora

## Stack
Node.js · Express · bcrypt · jsonwebtoken

## Endpoints

| Método | Ruta              | Descripción                                  | Requiere token |
|--------|-------------------|-----------------------------------------------|----------------|
| POST   | `/api/registro`   | Crea un usuario (body: `{ email, password }`) | No             |
| POST   | `/api/login`      | Login, devuelve un JWT                        | No             |
| GET    | `/api/perfil`     | Ruta protegida, devuelve datos del usuario     | Sí             |

## Conceptos aplicados

**bcrypt** — hashea contraseñas de forma irreversible. Nunca se guarda la contraseña en texto plano; solo se puede comparar, no "deshacer" el hash.

**JWT (JSON Web Token)** — token firmado que prueba la identidad del usuario sin necesidad de volver a enviar la contraseña en cada petición. Contiene un payload (datos del usuario), tiene fecha de expiración, y está firmado con una clave secreta del servidor.

**Middleware de autenticación** — función que se ejecuta antes de la ruta protegida, revisa el header `Authorization: Bearer <token>`, valida el JWT, y solo deja pasar (`next()`) si es válido.

## Cómo correrlo

```bash
npm install
node server.js
```

### Probar con PowerShell

```powershell
# Registro
Invoke-RestMethod -Uri "http://localhost:3000/api/registro" -Method Post -ContentType "application/json" -Body '{"email":"test@test.com","password":"123456"}'

# Login (guarda el token en una variable)
$respuesta = Invoke-RestMethod -Uri "http://localhost:3000/api/login" -Method Post -ContentType "application/json" -Body '{"email":"test@test.com","password":"123456"}'
$token = $respuesta.token

# Ruta protegida
Invoke-RestMethod -Uri "http://localhost:3000/api/perfil" -Headers @{"Authorization"="Bearer $token"}
```

---
Día 11 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
