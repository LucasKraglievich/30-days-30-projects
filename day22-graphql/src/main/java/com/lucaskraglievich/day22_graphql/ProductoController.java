package com.lucaskraglievich.day22_graphql;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ProductoController {

    private final List<Producto> productos = List.of(
            new Producto("1", "Zapatillas", 50000.0, 10),
            new Producto("2", "Mouse Inalámbrico", 8000.0, 15),
            new Producto("3", "Teclado Mecánico", 25000.0, 5)
    );

    @QueryMapping
    public List<Producto> productos() {
        return productos;
    }

    @QueryMapping
    public Producto producto(@Argument String id) {
        return productos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}