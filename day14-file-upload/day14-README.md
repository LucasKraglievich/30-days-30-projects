# Upload de Archivos 📁

API para subir imágenes con validación de tipo y tamaño usando Multer.

## ✨ Features
- Subida de imágenes (JPG, PNG, WEBP)
- Validación de tipo de archivo (rechaza lo que no sea imagen)
- Límite de tamaño máximo (5 MB)
- Nombres únicos con timestamp para evitar colisiones
- Manejo de errores específico de Multer

## 🛠 Stack
Node.js · Express · Multer

## 📌 Endpoint

| Método | Ruta          | Descripción                                    |
|--------|---------------|--------------------------------------------------|
| POST   | `/api/upload` | Sube una imagen (form-data, campo `imagen`)     |

## 💡 Conceptos aplicados

**multipart/form-data** — formato especial para enviar archivos en una petición HTTP, distinto al JSON usado en rutas anteriores.

**multer.diskStorage()** — configura dónde y con qué nombre se guardan los archivos en el servidor.

**fileFilter** — rechaza archivos antes de guardarlos si no cumplen el tipo permitido.

**limits** — previene que se suban archivos demasiado pesados que puedan saturar el servidor.

**Módulos nativos de Node.js** — `path` y `fs` para manejo de rutas y carpetas, sin necesidad de instalar librerías externas.

## 🚀 Cómo correrlo

```bash
npm install
node server.js
```

### Probar con Postman
1. Método POST a `http://localhost:3000/api/upload`
2. Body → form-data
3. Key: `imagen`, tipo `File`, seleccionar una imagen
4. Send

---
Día 14 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
