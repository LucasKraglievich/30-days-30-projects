# Día 28 — Mensajería con RabbitMQ

## Sobre el proyecto

API en Spring Boot que desacopla un proceso (notificaciones) usando una
cola de mensajes en vez de llamarlo directo. El productor y el consumidor
no se conocen entre sí — solo hablan a través de RabbitMQ.

## Stack

- Java 21
- Spring Boot 4.1.0
- Spring Web
- Spring for RabbitMQ (spring-boot-starter-amqp)
- RabbitMQ hosteado en [CloudAMQP](https://www.cloudamqp.com/) (free tier)

## Por qué CloudAMQP y no RabbitMQ local

El plan inicial era correr RabbitMQ nativo en Windows (Erlang + RabbitMQ
Server), como se hizo con Redis en el día 23. Después de una troubleshooting
larga —versión de Erlang incompatible, problemas de registro del servicio
de Windows, y un mismatch del `.erlang.cookie` entre el servicio (corre
como SYSTEM) y el usuario— se optó por CloudAMQP: RabbitMQ gratis en la
nube, sin instalación local, para no perder más tiempo en infraestructura
y enfocarse en el concepto del día.

## Qué incluye

- `RabbitMQConfig`: declara la cola `notificaciones` como durable (sobrevive
  un reinicio del broker).
- `NotificacionProducer`: publica mensajes en la cola con `RabbitTemplate`.
- `NotificacionConsumer`: escucha la cola con `@RabbitListener` y procesa
  cada mensaje que llega, automáticamente.
- `NotificacionController`: expone `POST /notificaciones/enviar` para
  disparar el flujo.

## Cómo correrlo

Requiere una URL de conexión AMQP (de CloudAMQP u otro broker) en
`application.properties`:

```properties
spring.rabbitmq.addresses=amqps://usuario:password@host/vhost
app.queue.name=notificaciones
```

```bash
mvn spring-boot:run
```

## Resultado probado

```
POST /notificaciones/enviar?mensaje=Hola%20RabbitMQ
→ "Notificación encolada correctamente."

[Producer] Mensaje enviado a la cola: Hola RabbitMQ
[Consumer] Notificación recibida y procesada: Hola RabbitMQ
```

Productor y consumidor corriendo en el mismo proceso pero completamente
desacoplados — en un sistema real podrían ser dos servicios distintos, sin
que ninguno sepa que el otro existe.

## Qué aprendí

- El patrón productor/consumidor con colas: la base de arquitecturas
  desacopladas y de sistemas que necesitan absorber picos de carga sin
  caerse.
- Diagnóstico de infraestructura en Windows: versiones de Erlang
  incompatibles con RabbitMQ, registro de servicios de Windows, y el
  archivo `.erlang.cookie` que autentica el CLI contra el broker.
- Cuándo tiene sentido usar un servicio gestionado (CloudAMQP) en vez de
  perder tiempo de desarrollo en infraestructura local — una decisión
  pragmática, no solo técnica.
