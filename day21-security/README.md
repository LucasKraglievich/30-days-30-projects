# Spring Security + JWT 

Autenticación con JWT usando Spring Security — el estándar de la industria para apps Java.

## ✨ Features
- Registro con contraseña hasheada (BCrypt)
- Login con generación de JWT
- Filtro JWT que intercepta cada request
- Rutas públicas y protegidas configuradas
- Stateless — sin sesiones del lado del servidor

## Stack
Java 21 · Spring Boot · Spring Security · JJWT · PostgreSQL · JPA

## Endpoints

| Método | Ruta              | Descripción                          |
|--------|-------------------|----------------------------------------|
| POST    | `/api/auth/registro`     | Crea un usuario                |
| POST   | `/api/auth/login`     | Login, devuelve JWT |
| GET   | `/api/auth/perfil`| Ruta protegida                   |


## Conceptos aplicados

@EnableWebSecurity: habilita la configuración personalizada de Spring Security.

OncePerRequestFilter: filtro que se ejecuta una vez por request, intercepta el token JWT del header Authorization

SecurityFilterChain: define qué rutas son públicas (/api/auth/**) y cuáles requieren autenticación.

SessionCreationPolicy.STATELESS: sin sesiones del lado del servidor, cada request se autentica con el JWT.

## Cómo correrlo

Requiere PostgreSQL corriendo con base de datos tareas_db.

Día 21 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
