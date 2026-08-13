package com.lucaskraglievich.day28_rabbitmq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificacionController {

    @Autowired
    private NotificacionProducer producer;

    @PostMapping("/notificaciones/enviar")
    public String enviar(@RequestParam String mensaje) {
        producer.enviarNotificacion(mensaje);
        return "Notificación encolada correctamente.";
    }
}