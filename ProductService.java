package com.example.day22.service;

import com.example.day22.model.Product;
import com.example.day22.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProductService {

    private final ProductRepository repository;

    @Autowired
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado: " + id));
    }

    public Product create(Product product) {
        return repository.save(product);
    }

    /**
     * Regla de negocio real que vale la pena testear:
     * no se puede descontar más stock del disponible.
     */
    public Product decreaseStock(Long id, int quantity) {
        Product product = findById(id);
        if (product.getStock() < quantity) {
            throw new IllegalStateException("Stock insuficiente para el producto: " + id);
        }
        product.setStock(product.getStock() - quantity);
        return repository.save(product);
    }
}
