package com.lucaskraglievich.day23_redis_cache;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductoController {

    // Simula una consulta lenta (ej: a una base de datos o API externa)
    @Cacheable("productos")
    @GetMapping("/productos/{id}")
    public String obtenerProducto(@PathVariable String id) throws InterruptedException {
        Thread.sleep(3000); // simula 3 segundos de demora
        return "Producto " + id + " - consultado a las " + java.time.LocalTime.now();
    }
}