package com.example.day22.service;

import com.example.day22.model.Product;
import com.example.day22.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

/**
 * Unit tests puros: NO levantan el contexto de Spring.
 * El repository se mockea, así que corren en milisegundos.
 * Acá probamos la LÓGICA DE NEGOCIO, no la capa web ni la DB.
 */
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    private Product product;

    @BeforeEach
    void setUp() {
        product = new Product("Zapatillas", 50000.0, 10);
        product.setId(1L);
    }

    @Test
    void deberiaDescontarStockCuandoHayCantidadSuficiente() {
        when(repository.findById(1L)).thenReturn(Optional.of(product));
        when(repository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product result = service.decreaseStock(1L, 3);

        assertThat(result.getStock()).isEqualTo(7);
        verify(repository).save(product);
    }

    @Test
    void deberiaFallarSiElStockEsInsuficiente() {
        when(repository.findById(1L)).thenReturn(Optional.of(product));

        assertThatThrownBy(() -> service.decreaseStock(1L, 999))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("Stock insuficiente");

        // Si falla la validación, NUNCA debería llegar a guardar
        verify(repository, never()).save(any());
    }

    @Test
    void deberiaLanzarExcepcionSiElProductoNoExiste() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById(99L))
                .isInstanceOf(java.util.NoSuchElementException.class);
    }
}
