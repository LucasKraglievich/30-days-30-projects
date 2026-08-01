package com.lucaskraglievich.day26_async_scheduled;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LimpiezaScheduler {

    // Corre cada 10 segundos (10000 ms) — simula una tarea de mantenimiento,
    // como limpiar sesiones vencidas o logs viejos.
    @Scheduled(fixedRate = 10000)
    public void limpiarDatosTemporales() {
        System.out.println("[" + java.time.LocalTime.now() + "] Ejecutando limpieza automática de datos temporales...");
    }
}