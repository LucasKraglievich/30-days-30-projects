# Rate Limiting + Logs 🚦

API protegida contra exceso de peticiones, con logging automático de requests.

## ✨ Features
- Límite de peticiones por IP (5 por minuto en rutas `/api/`)
- Respuesta 429 al superar el límite
- Logs automáticos de cada request (método, ruta, status, tiempo)
- Rate limiting aplicado selectivamente, no a toda la app

## 🛠 Stack
Node.js · Express · express-rate-limit · morgan

## 📌 Endpoints

| Método | Ruta         | Descripción                          | Rate limit |
|--------|--------------|----------------------------------------|------------|
| GET    | `/`          | Ruta sin límite                        | No         |
| GET    | `/api/test`  | Ruta de prueba con límite              | Sí (5/min) |

## 💡 Conceptos aplicados

**Rate limiting** — protege el servidor de bots, ataques DDoS, o usuarios que por error mandan demasiadas peticiones. Status `429 Too Many Requests` es el código HTTP estándar para esto.

**Logging con morgan** — registra automáticamente cada request en consola (método, ruta, status, tiempo de respuesta). Esencial para debuggear en producción.

**Aplicación selectiva de middleware** — `app.use('/api/', limiter)` aplica el límite solo a rutas que empiecen con `/api/`, dejando otras rutas libres.

## 🚀 Cómo correrlo

```bash
npm install
node server.js
```

Probá refrescar `http://localhost:3000/api/test` más de 5 veces en un minuto para ver el rate limit en acción.

---
Día 15 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)

🎉 **Cierre de la sub-etapa Node.js/Express** — del día 16 en adelante arranca PostgreSQL.
