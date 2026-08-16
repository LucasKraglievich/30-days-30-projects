# Día 29 — CI/CD con GitHub Actions ⚙️

## Sobre el día

No hay un proyecto Spring Boot nuevo para este día — el "código" es un
**pipeline de integración continua**: un archivo YAML que le dice a GitHub
qué hacer automáticamente cada vez que se sube código al repo.

## Dónde vive el código real

El workflow no está en esta carpeta — vive en:

```
.github/workflows/ci.yml
```

(esa es la ubicación que exige GitHub para que lo detecte y ejecute
automáticamente).

## Qué hace el pipeline

Cada vez que hay un `push` o un `pull request` a la rama `main`, GitHub:

1. Levanta una máquina virtual Linux (Ubuntu).
2. Baja el código del repo (`actions/checkout`).
3. Instala Java 21 (`actions/setup-java`, distribución Temurin).
4. Corre `mvn clean verify` sobre el proyecto del día 24
   (`day24-exception-handling`), que compila el código y ejecuta sus
   tests.
5. Marca el commit con ✅ si todo pasó, o ❌ si algo falló.

```yaml
name: CI - Build y Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout código
        uses: actions/checkout@v4
      - name: Configurar Java 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      - name: Compilar y testear día 24
        working-directory: ./day24-exception-handling
        run: mvn clean verify
```

## Resultado

Pipeline corriendo en verde ✅ en la pestaña
[Actions](../../actions) del repo, disparado automáticamente en cada
push.

## Qué aprendí

- La diferencia entre testear "a mano" en tu máquina y tener un pipeline
  que corre esos mismos tests automáticamente, en un entorno limpio,
  cada vez que alguien sube código — nadie puede subir código roto sin
  que se note.
- La estructura mínima de un workflow de GitHub Actions: `on` (cuándo se
  dispara), `jobs` (qué máquina y qué pasos corren).
- Que GitHub Actions no vive "dentro" de un proyecto como los demás días
  del reto, sino a nivel de todo el repositorio, en `.github/workflows/`.

## Próximos pasos

Agregar un segundo job que también corra los tests de otros proyectos
del reto (día 20, 26, etc.), y explorar agregar un paso de deploy
automático a un servicio como Render cuando el pipeline pasa en verde.