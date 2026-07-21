package com.lucaskraglievich.day22_graphql;

public class Producto {

    private String id;
    private String nombre;
    private Double precio;
    private Integer stock;

    public Producto() {
    }

    public Producto(String id, String nombre, Double precio, Integer stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    public String getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public Integer getStock() {
        return stock;
    }
}