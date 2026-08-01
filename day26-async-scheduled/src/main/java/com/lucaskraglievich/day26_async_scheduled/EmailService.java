package com.lucaskraglievich.day26_async_scheduled;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    // El @Async hace que este método corra en otro hilo,
    // sin bloquear al que llamó al método.
    @Async
    public void enviarEmailBienvenida(String destinatario) {
        try {
            Thread.sleep(3000); // simula el tiempo que tarda un envío real de email
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("[" + java.time.LocalTime.now() + "] Email enviado a " + destinatario + " - hilo: " + Thread.currentThread().getName());
    }
}