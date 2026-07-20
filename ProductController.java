package com.example.day22.controller;

import com.example.day22.model.Product;
import com.example.day22.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    @Autowired
    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<Product> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    // Endpoint protegido: solo ADMIN puede crear productos.
    // Es el que vamos a testear que devuelva 401/403 sin token válido.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product create(@RequestBody Product product) {
        return service.create(product);
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<Product> decreaseStock(@PathVariable Long id, @RequestParam int quantity) {
        return ResponseEntity.ok(service.decreaseStock(id, quantity));
    }
}
