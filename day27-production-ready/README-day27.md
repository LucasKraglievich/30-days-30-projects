# Día 27 — Production-Readiness: Actuator, Profiles y JAR Ejecutable 

## Sobre el proyecto

No es un endpoint nuevo — es sobre cómo preparás una app Spring Boot para
correr fuera del IDE, en un servidor real. Tres piezas: monitoreo con
Actuator, configuración distinta por entorno con Profiles, y un JAR que
corre solo.

## Stack

- Java 21
- Spring Boot 4.1.0
- Spring Web
- Spring Boot Actuator

## Qué incluye

### 1. Spring Boot Actuator

### 2. Spring Profiles (dev / prod)

### 3. JAR ejecutable + puerto configurable

## Cómo correrlo

```bash
# Modo dev (default)
mvn spring-boot:run

# Modo prod
$env:SPRING_PROFILES_ACTIVE="prod"
mvn spring-boot:run
```

## Resultado medido

| Profile | `/actuator/health` | `/actuator/info` (name) |
|---|---|---|
| dev | detalle completo (diskSpace, ping, liveness, readiness) | "Día 27 - Production Ready API" |
| prod | solo `status: UP` | "Día 27 - Production Ready API (PROD)" |

Confirmado que el mismo código, sin recompilar, se comporta distinto según
el entorno.

## Qué aprendí

- Actuator es el estándar de facto para exponer salud y metadata de una
  app Spring Boot — lo esperan plataformas como Render, AWS o Kubernetes
  para hacer health checks automáticos.
- Cómo separar configuración por entorno con archivos
  `application-{profile}.properties`, sin ensuciar el código con ifs.
- La diferencia entre correr una app desde el IDE (`mvn spring-boot:run`)
  y como se corre en producción real: un `.jar` autocontenido, ejecutado
  con `java -jar`.
- Externalizar configuración sensible (puertos, profiles) vía variables
  de entorno, en vez de hardcodearla.

