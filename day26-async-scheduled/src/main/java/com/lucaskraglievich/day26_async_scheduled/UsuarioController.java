package com.lucaskraglievich.day26_async_scheduled;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/usuarios/registrar")
    public String registrar(@RequestParam String email) {
        emailService.enviarEmailBienvenida(email);
        return "Usuario registrado. El email de bienvenida se está enviando en background.";
    }
}