# Día 24 — Manejo Global de Excepciones + Validación ⚠️

## Sobre el proyecto

API en Spring Boot que centraliza el manejo de errores con
`@RestControllerAdvice` y valida los datos de entrada con Bean Validation.
En vez de que cada endpoint maneje sus propios errores con try/catch, hay
un solo lugar que captura y da formato a cualquier excepción de la app.

## Stack

- Java 21
- Spring Boot 4.1.0
- Spring Web
- Spring Boot Starter Validation (Bean Validation / Jakarta Validation)

## Qué incluye

- `ProductoRequest`: DTO con reglas de validación (`@NotBlank`, `@Positive`).
- `ProductoController`: endpoint `POST /productos` que usa `@Valid` para
  disparar la validación automáticamente.
- `GlobalExceptionHandler`: captura `MethodArgumentNotValidException`
  (errores de validación) y cualquier otra excepción no manejada,
  devolviendo siempre una respuesta JSON consistente en vez de un stack
  trace.

## Cómo correrlo

```bash
mvn spring-boot:run
```

## Ejemplos probados

**Request inválido** (`nombre` vacío, `precio` negativo):

```json
{
  "errores": {
    "precio": "El precio debe ser mayor a 0",
    "nombre": "El nombre es obligatorio"
  },
  "timestamp": "2026-07-27T23:25:48.5009432",
  "status": 400
}
```

**Request válido:**

```
Producto creado: Zapatillas
```

## Qué aprendí

- `@RestControllerAdvice` aplica el manejo de errores a todos los
  controllers de la app, sin repetir código.
- `@Valid` + anotaciones de Bean Validation (`@NotBlank`, `@Positive`, etc.)
  validan el request antes de que llegue a la lógica del controller.
- La diferencia entre una API "amateur" (devuelve stack traces o mensajes
  crípticos) y una production-ready (respuestas de error estructuradas,
  consistentes y con el detalle justo para que el cliente sepa qué
  corregir).

## Próximos pasos

Documentar estas respuestas de error en Swagger (día 25), para que quede
claro desde la documentación qué códigos de error puede devolver cada
endpoint.
