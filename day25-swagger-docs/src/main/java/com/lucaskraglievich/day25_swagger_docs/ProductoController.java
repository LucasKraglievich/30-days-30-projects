package com.lucaskraglievich.day25_swagger_docs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Productos", description = "Operaciones sobre el catálogo de productos")
public class ProductoController {

    @Operation(summary = "Obtener un producto por ID", description = "Devuelve el nombre del producto correspondiente al ID recibido")
    @GetMapping("/productos/{id}")
    public String obtenerProducto(@PathVariable String id) {
        return "Producto " + id;
    }
}