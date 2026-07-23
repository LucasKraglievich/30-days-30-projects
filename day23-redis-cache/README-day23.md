# Día 23 — Caching con Spring Cache + Redis 

## Sobre el proyecto

API en Spring Boot que usa **Redis** (vía Memurai en Windows) como capa de
caché para evitar recalcular u obtener de nuevo datos costosos. Simula una
consulta lenta (3 segundos) y demuestra cómo, con una sola anotación, la
segunda llamada al mismo recurso se sirve casi instantáneamente desde
memoria en vez de ejecutar la lógica de nuevo.

## Stack

- Java 21
- Spring Boot 4.1.0
- Spring Web
- Spring Data Redis (Lettuce)
- Spring Cache Abstraction
- Memurai (Redis-compatible, nativo para Windows — alternativa a correr
  Redis en Docker/WSL)

## Cómo correrlo

Requiere Memurai (o Redis) corriendo en `localhost:6379`.

```bash
mvn spring-boot:run
```

## Endpoint

```
GET /productos/{id}
```

La primera vez que se pide un `id`, el método simula una demora de 3
segundos (`Thread.sleep`) antes de responder. Las siguientes veces que se
pide el **mismo** `id`, Spring Cache devuelve el resultado guardado en
Redis sin volver a ejecutar el método.

## Resultado medido

| Llamada | Tiempo |
|---|---|
| 1ª vez a `/productos/1` (sin cache) | ~4.07 s |
| 2ª vez a `/productos/1` (con cache) | ~6 ms |
| 1ª vez a `/productos/2` (id nuevo, sin cache) | ~3.02 s |

Confirma dos cosas: que el cache reduce drásticamente el tiempo de
respuesta, y que cachea **por parámetro** (`id`), no la respuesta entera
del endpoint.

## Qué aprendí

- `@EnableCaching` en la clase principal activa el soporte de caché de
  Spring.
- `@Cacheable("nombre")` en un método cachea su resultado usando los
  argumentos del método como parte de la clave.
- Cómo instalar y correr Redis en Windows sin Docker, usando Memurai
  (servicio nativo de Windows, 100% compatible con el protocolo Redis).
- Troubleshooting de conflictos de merge en Git (`git pull` con mensajes
  de merge en Vim) al trabajar el mismo repo desde más de un lugar.

## Próximos pasos

Configurar un **TTL** (tiempo de expiración) para las entradas del cache,
para que los datos no queden cacheados para siempre — importante en un
caso real donde el dato de origen puede cambiar.
