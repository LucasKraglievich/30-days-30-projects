// Conjuntos de caracteres disponibles
const CHARS = {
  minusculas: 'abcdefghijklmnopqrstuvwxyz',
  mayusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeros:    '0123456789',
  simbolos:   '!@#$%&*()-_=+[]?'
};

// Esta función usa crypto.getRandomValues() — es criptográficamente segura,
// a diferencia de Math.random() que es predecible.
function getRandomIndex(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

// Actualiza el número visible cuando se mueve el slider
function actualizarLongitud() {
  const longitud = document.getElementById('longitud').value;
  document.getElementById('longitud-valor').textContent = longitud;
}

// Calcula y muestra la barra de seguridad
function actualizarSeguridad(password) {
  const barra  = document.getElementById('barra');
  const texto  = document.getElementById('seguridad-texto');
  const longitud = password.length;

  const tieneMayusculas = /[A-Z]/.test(password);
  const tieneNumeros    = /[0-9]/.test(password);
  const tieneSimbolos   = /[^a-zA-Z0-9]/.test(password);

  // Puntaje basado en longitud y variedad de caracteres
  let puntaje = 0;
  if (longitud >= 8)  puntaje++;
  if (longitud >= 16) puntaje++;
  if (tieneMayusculas) puntaje++;
  if (tieneNumeros)    puntaje++;
  if (tieneSimbolos)   puntaje++;

  if (puntaje <= 2) {
    barra.style.width           = '33%';
    barra.style.backgroundColor = '#f87171';
    texto.style.color           = '#f87171';
    texto.textContent           = 'Débil';
  } else if (puntaje <= 3) {
    barra.style.width           = '66%';
    barra.style.backgroundColor = '#fbbf24';
    texto.style.color           = '#fbbf24';
    texto.textContent           = 'Media';
  } else {
    barra.style.width           = '100%';
    barra.style.backgroundColor = '#4ade80';
    texto.style.color           = '#4ade80';
    texto.textContent           = 'Fuerte';
  }
}

// Función principal: genera la contraseña
function generarPassword() {
  const longitud    = parseInt(document.getElementById('longitud').value);
  const usaMayusc   = document.getElementById('mayusculas').checked;
  const usaNumeros  = document.getElementById('numeros').checked;
  const usaSimbolos = document.getElementById('simbolos').checked;

  // Armo el pool de caracteres disponibles
  let pool = CHARS.minusculas;
  if (usaMayusc)   pool += CHARS.mayusculas;
  if (usaNumeros)  pool += CHARS.numeros;
  if (usaSimbolos) pool += CHARS.simbolos;

  // Validación: al menos tiene minúsculas siempre
  if (pool.length === 0) {
    document.getElementById('password').textContent = 'Seleccioná al menos una opción';
    return;
  }

  // Genero la contraseña caracter por caracter
  let password = '';
  for (let i = 0; i < longitud; i++) {
    password += pool[getRandomIndex(pool.length)];
  }

  // Muestro el resultado y actualizo la barra de seguridad
  document.getElementById('password').textContent = password;
  actualizarSeguridad(password);
}

// Copia la contraseña al portapapeles
function copiarPassword() {
  const password = document.getElementById('password').textContent;

  if (password === 'Presioná Generar' || password === 'Seleccioná al menos una opción') {
    return;
  }

  navigator.clipboard.writeText(password).then(() => {
    const mensaje = document.getElementById('mensaje');
    mensaje.style.display = 'block';
    setTimeout(() => {
      mensaje.style.display = 'none';
    }, 2000);
  });
}

// Genero una contraseña automáticamente al cargar la página
generarPassword();
