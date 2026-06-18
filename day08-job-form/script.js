// Guardo el estado de validez de cada campo
const validez = {
  nombre:      false,
  email:       false,
  linkedin:    false,
  experiencia: false
};

// Regex para validar email — formato estándar usuario@dominio.extensión
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex para validar URL de LinkedIn — acepta con o sin https, con o sin www
const REGEX_LINKEDIN = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;

// Marca un input como válido o inválido visualmente
function marcarEstado(input, esValido) {
  input.classList.remove('valido', 'invalido');
  if (esValido) {
    input.classList.add('valido');
  } else if (input.value.length > 0) {
    input.classList.add('invalido');
  }
}

// Valida el nombre — mínimo 3 caracteres, solo letras y espacios
function validarNombre() {
  const input = document.getElementById('nombre');
  const error = document.getElementById('error-nombre');
  const valor = input.value.trim();

  const soloLetras = /^[a-zA-ZÀ-ÿ\s]+$/;

  if (valor.length === 0) {
    error.textContent = '';
    validez.nombre = false;
  } else if (valor.length < 3) {
    error.textContent = 'Ingresá al menos 3 caracteres';
    validez.nombre = false;
  } else if (!soloLetras.test(valor)) {
    error.textContent = 'Solo se permiten letras y espacios';
    validez.nombre = false;
  } else {
    error.textContent = '';
    validez.nombre = true;
  }

  marcarEstado(input, validez.nombre);
  actualizarBoton();
}

// Valida el email con regex
function validarEmail() {
  const input = document.getElementById('email');
  const error = document.getElementById('error-email');
  const valor = input.value.trim();

  if (valor.length === 0) {
    error.textContent = '';
    validez.email = false;
  } else if (!REGEX_EMAIL.test(valor)) {
    error.textContent = 'Ingresá un email válido (ej: nombre@dominio.com)';
    validez.email = false;
  } else {
    error.textContent = '';
    validez.email = true;
  }

  marcarEstado(input, validez.email);
  actualizarBoton();
}

// Valida la URL de LinkedIn con regex
function validarLinkedin() {
  const input = document.getElementById('linkedin');
  const error = document.getElementById('error-linkedin');
  const valor = input.value.trim();

  if (valor.length === 0) {
    error.textContent = '';
    validez.linkedin = false;
  } else if (!REGEX_LINKEDIN.test(valor)) {
    error.textContent = 'Formato esperado: linkedin.com/in/tu-perfil';
    validez.linkedin = false;
  } else {
    error.textContent = '';
    validez.linkedin = true;
  }

  marcarEstado(input, validez.linkedin);
  actualizarBoton();
}

// Valida años de experiencia — número entero entre 0 y 50
function validarExperiencia() {
  const input = document.getElementById('experiencia');
  const error = document.getElementById('error-experiencia');
  const valor = input.value.trim();

  const esNumero = /^\d+$/.test(valor);
  const numero   = parseInt(valor);

  if (valor.length === 0) {
    error.textContent = '';
    validez.experiencia = false;
  } else if (!esNumero) {
    error.textContent = 'Ingresá solo números';
    validez.experiencia = false;
  } else if (numero < 0 || numero > 50) {
    error.textContent = 'Ingresá un valor entre 0 y 50';
    validez.experiencia = false;
  } else {
    error.textContent = '';
    validez.experiencia = true;
  }

  marcarEstado(input, validez.experiencia);
  actualizarBoton();
}

// Habilita el botón de envío solo si todos los campos son válidos
function actualizarBoton() {
  const todoValido = Object.values(validez).every(v => v === true);
  document.getElementById('btn-enviar').disabled = !todoValido;
}

// Maneja el envío del formulario
function enviarFormulario(event) {
  event.preventDefault(); // evito que la página se recargue

  // Muestro el mensaje de éxito
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('mensaje-exito').style.display = 'block';
}
