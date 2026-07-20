package com.example.day22.controller;

import com.example.day22.model.Product;
import com.example.day22.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * @WebMvcTest levanta SOLO la capa web (controller + filtros de seguridad),
 * no el contexto completo. El Service se mockea con @MockBean.
 * Es más rápido que @SpringBootTest y más realista que probar el
 * controller "a mano" sin pasar por Spring MVC.
 */
@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService service;

    @Test
    @WithMockUser(roles = "ADMIN")
    void deberiaDevolverListaDeProductos() throws Exception {
        Product p = new Product("Zapatillas", 50000.0, 10);
        p.setId(1L);
        when(service.findAll()).thenReturn(List.of(p));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Zapatillas"));
    }

    @Test
    void deberiaRechazarCreacionSinAutenticar() throws Exception {
        // Sin @WithMockUser: simula un request sin token/sesión válida.
        // Esto es lo que conecta directo con el día 21 (Security).
        Product nuevo = new Product("Remera", 15000.0, 20);

        mockMvc.perform(post("/api/products")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(nuevo)))
                .andExpect(status().is4xxClientError()); // 401 o 403 según tu SecurityConfig
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void deberiaCrearProductoConRolAdmin() throws Exception {
        Product nuevo = new Product("Remera", 15000.0, 20);
        Product guardado = new Product("Remera", 15000.0, 20);
        guardado.setId(2L);

        when(service.create(any())).thenReturn(guardado);

        mockMvc.perform(post("/api/products")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(nuevo)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2));
    }
}
