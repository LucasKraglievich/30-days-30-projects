# Día 25 — Documentación de API con Swagger/OpenAPI

## Sobre el proyecto

API en Spring Boot documentada automáticamente con `springdoc-openapi`.
En vez de escribir el schema de OpenAPI a mano, la librería lo genera a
partir de los controllers y sus anotaciones, y expone una interfaz visual
donde se puede leer y probar cada endpoint sin salir del navegador.

## Stack

- Java 21
- Spring Boot 4.1.0
- Spring Web
- springdoc-openapi-starter-webmvc-ui 2.8.5

## Cómo correrlo

```bash
mvn spring-boot:run
```

La documentación interactiva queda disponible en:

```
http://localhost:8080/swagger-ui/index.html
```

El schema OpenAPI en formato JSON, en:

```
http://localhost:8080/v3/api-docs
```

## Qué incluye

`ProductoController` expone `GET /productos/{id}`, documentado con:

- `@Tag`: agrupa el endpoint bajo la categoría "Productos" en la UI.
- `@Operation`: agrega resumen y descripción legible de qué hace el
  endpoint.

## Probado

Ejecutado en vivo desde Swagger UI con "Try it out":

```
GET /productos/sdsadfsfwae → 200 OK
Producto sdsadfsfwae
```

Swagger generó automáticamente el comando `curl` equivalente al request.

## Qué aprendí

- La diferencia entre documentar una API a mano (Markdown desactualizado
  al toque) y generarla desde el código con `springdoc-openapi`: si el
  endpoint cambia, la documentación se actualiza sola.
- Cómo agregar una dependencia manualmente al `pom.xml` cuando no está
  disponible como opción en Spring Initializr.
- Swagger UI no es solo documentación pasiva — permite ejecutar requests
  reales contra la API corriendo en local, útil para testear a mano sin
  Postman.

## Próximos pasos

Agregar ejemplos de request/response con `@ApiResponse` y `@ExampleObject`
para que la documentación incluya casos de éxito y de error (conectando
con el manejo de excepciones del día 24).
