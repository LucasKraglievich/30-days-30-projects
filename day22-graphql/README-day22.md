# Día 22 — API GraphQL con Spring Boot 🔗

## Sobre el proyecto

API GraphQL construida con Spring Boot que expone un catálogo de productos.
A diferencia de una API REST tradicional (como la del día 19), acá el
cliente decide exactamente qué campos quiere recibir en cada consulta,
en lugar de recibir siempre el objeto completo.

## Stack

- Java 21
- Spring Boot 4.1.0
- Spring for GraphQL
- Maven

## Queries disponibles

```graphql
type Query {
    productos: [Producto]
    producto(id: ID): Producto
}

type Producto {
    id: ID
    nombre: String
    precio: Float
    stock: Int
}
```

## Cómo correrlo

```bash
mvn spring-boot:run
```

El endpoint queda disponible en `POST http://localhost:8080/graphql`.

## Ejemplo de consulta

```graphql
{
  productos {
    id
    nombre
    precio
  }
}
```

Probado con PowerShell:

```powershell
$body = @{ query = "{ productos { id nombre precio } }" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:8080/graphql -Method Post -Body $body -ContentType "application/json"
```

## Qué aprendí

- Cómo definir un schema GraphQL (`schema.graphqls`) y mapearlo a clases Java
  con `@QueryMapping` y `@Argument`.
- La diferencia clave con REST: en GraphQL el cliente pide solo los campos
  que necesita, en un solo endpoint (`/graphql`) en vez de múltiples rutas.
- Troubleshooting real de Spring Boot: puertos ocupados (`netstat` +
  `taskkill`), y por qué GraphQL devuelve 404 si el schema no se carga
  (falta el archivo o no está en la carpeta correcta).

## Próximos pasos

Conectar el resolver a una base de datos real (PostgreSQL + JPA) en vez de
una lista en memoria — como ya se hizo en el día 20 para REST.
