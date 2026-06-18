# Generador de Contraseñas Seguras 🔐

Generá contraseñas seguras al instante con opciones personalizables.

## 🚀 Demo
[Ver en vivo](https://lucaskraglievich.github.io/day03-passwords)

## ✨ Features
- Longitud configurable de 6 a 32 caracteres
- Activá mayúsculas, números y símbolos
- Indicador de seguridad: Débil / Media / Fuerte
- Copiá al portapapeles con un clic
- Usa `crypto.getRandomValues()` — aleatoriedad criptográfica real

## 🛠 Stack
HTML · CSS · JavaScript (Web Crypto API)

## 💡 Por qué crypto.getRandomValues() y no Math.random()
`Math.random()` es pseudoaleatorio y predecible. `crypto.getRandomValues()` 
usa la entropía del sistema operativo, lo que lo hace adecuado para seguridad.

## 📌 Cómo usarlo
Abrí `index.html` en el navegador. No necesita servidor.

---
Día 3 / 30 · Challenge de proyectos · [@lucaskraglievich](https://github.com/lucaskraglievich)
