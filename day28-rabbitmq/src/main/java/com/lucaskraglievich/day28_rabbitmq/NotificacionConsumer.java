package com.lucaskraglievich.day28_rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class NotificacionConsumer {

    @RabbitListener(queues = "${app.queue.name}")
    public void recibirNotificacion(String mensaje) {
        System.out.println("[Consumer] Notificación recibida y procesada: " + mensaje);
    }
}