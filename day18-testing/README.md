# Testing con Jest y Supertest 🧪

Tests automatizados para una API REST usando Jest y Supertest.

## ✨ Features
- 7 tests cubriendo GET, POST y DELETE
- Tests de casos exitosos y casos de error
- Estado limpio antes de cada test con `beforeEach`
- Servidor exportado sin `app.listen()` para testing

## Stack
Node.js · Express · Jest · Supertest

## Tests incluidos

| Endpoint | Test | Resultado esperado |
|----------|------|-------------------|
| GET /api/tareas | Array vacío sin tareas | 200 |
| GET /api/tareas | Devuelve tareas existentes | 200 |
| POST /api/tareas | Crea tarea correctamente | 201 |
| POST /api/tareas | Título vacío | 400 |
| POST /api/tareas | Sin título | 400 |
| DELETE /api/tareas/:id | Elimina tarea existente | 204 |
| DELETE /api/tareas/:id | Tarea inexistente | 404 |

## Conceptos aplicados

**`beforeEach`** — limpia el estado antes de cada test para que sean independientes entre sí.

**Tests negativos** — probar los casos de error es tan importante como probar que funciona bien.

**`module.exports` sin `app.listen()`** — patrón que permite a Supertest hacer requests directamente a la app sin levantar un servidor real.

## Cómo correrlo

```bash
npm install
npm test
```

---
Día 18 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
