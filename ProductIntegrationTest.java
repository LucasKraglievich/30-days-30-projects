package com.example.day22.integration;

import com.example.day22.model.Product;
import com.example.day22.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Levanta el contexto COMPLETO de Spring (controller + service + repository
 * + security) contra una base H2 en memoria. Es el test más lento pero el
 * más realista: prueba el flujo de punta a punta, tal como lo haría un
 * request real.
 *
 * Requiere application-test.properties con la config de H2 (ver más abajo)
 * y @ActiveProfiles("test") para no tocar tu base de Postgres real.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository repository;

    @Test
    void flujoCompleto_crearYConsultarProducto() throws Exception {
        Product nuevo = new Product("Mouse Inalámbrico", 8000.0, 15);

        String response = mockMvc.perform(post("/api/products")
                        .with(user("admin").roles("ADMIN"))
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(nuevo)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        Product creado = objectMapper.readValue(response, Product.class);

        mockMvc.perform(get("/api/products/" + creado.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Mouse Inalámbrico"));

        // Verificación directa contra la DB, no solo contra la respuesta HTTP
        assertThatProductExistsInDb(creado.getId());
    }

    @Test
    void endpointProtegido_sinTokenDevuelve401o403() throws Exception {
        Product nuevo = new Product("Teclado", 12000.0, 5);

        mockMvc.perform(post("/api/products")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(nuevo)))
                .andExpect(status().is4xxClientError());
    }

    private void assertThatProductExistsInDb(Long id) {
        repository.findById(id).orElseThrow(() ->
                new AssertionError("El producto debería existir en la base de datos"));
    }
}
