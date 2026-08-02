# Día 26 — Procesamiento Asíncrono con @Async y @Scheduled

## Sobre el proyecto

API en Spring Boot que demuestra dos formas de que el código corra "por su
cuenta", sin bloquear al usuario ni depender de un request:

- **`@Async`**: un método pesado corre en otro hilo, mientras el endpoint
  ya le respondió al cliente.
- **`@Scheduled`**: una tarea se ejecuta sola, en un intervalo fijo, sin
  que nadie la dispare.

## Stack

- Java 21
- Spring Boot 4.1.0
- Spring Web

## Qué incluye

- `EmailService.enviarEmailBienvenida`: simula el envío de un email (3s de
  demora) marcado con `@Async` — corre en un hilo separado (`task-1`).
- `UsuarioController`: expone `POST /usuarios/registrar`, que dispara el
  email async y responde de inmediato, sin esperar.
- `LimpiezaScheduler.limpiarDatosTemporales`: tarea con
  `@Scheduled(fixedRate = 10000)` que simula una limpieza periódica (ej:
  sesiones vencidas, logs viejos), disparándose sola cada 10 segundos.
- `@EnableAsync` y `@EnableScheduling` en la clase principal, necesarios
  para activar ambos mecanismos.

## Cómo correrlo

```bash
mvn spring-boot:run
```

## Resultado medido

**Async:** el POST respondió exactamente en el mismo segundo que se envió
el request, mientras el email se completó recién 3 segundos después, en
background.

**Scheduled:** la tarea se disparó sola, cada 10 segundos exactos, sin
intervención:

## Qué aprendí

- La diferencia entre un método síncrono (bloquea hasta terminar) y uno
  `@Async` (se dispara y el hilo principal sigue su camino).
- Que `@Async` necesita correr en un bean gestionado por Spring (no sirve
  llamarlo desde dentro de la misma clase) y requiere `@EnableAsync`.
- Cómo programar tareas periódicas con `@Scheduled`, útil para
  mantenimiento, limpieza de datos, o sincronizaciones automáticas.
- Diagnóstico de puertos ocupados por procesos colgados (`netstat` +
  `taskkill`), algo que se repite seguido trabajando con Spring Boot en
  Windows.

## Próximos pasos

Reemplazar el `System.out.println` por un logger real (`Logger`/`Slf4j`),
y agregar manejo de errores dentro del método `@Async` — hoy, si falla,
la excepción se pierde silenciosamente.
