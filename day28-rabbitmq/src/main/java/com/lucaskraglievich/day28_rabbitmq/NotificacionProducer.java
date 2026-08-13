package com.lucaskraglievich.day28_rabbitmq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NotificacionProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${app.queue.name}")
    private String queueName;

    public void enviarNotificacion(String mensaje) {
        rabbitTemplate.convertAndSend(queueName, mensaje);
        System.out.println("[Producer] Mensaje enviado a la cola: " + mensaje);
    }
}