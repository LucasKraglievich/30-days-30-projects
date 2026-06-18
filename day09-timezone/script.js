const CIUDADES = [
  { nombre: 'Buenos Aires',    zona: 'America/Argentina/Buenos_Aires', bandera: '🇦🇷' },
  { nombre: 'Nueva York',      zona: 'America/New_York',               bandera: '🇺🇸' },
  { nombre: 'Los Ángeles',     zona: 'America/Los_Angeles',            bandera: '🇺🇸' },
  { nombre: 'Londres',         zona: 'Europe/London',                  bandera: '🇬🇧' },
  { nombre: 'Madrid',          zona: 'Europe/Madrid',                  bandera: '🇪🇸' },
  { nombre: 'París',           zona: 'Europe/Paris',                   bandera: '🇫🇷' },
  { nombre: 'Berlín',          zona: 'Europe/Berlin',                  bandera: '🇩🇪' },
  { nombre: 'Dubái',           zona: 'Asia/Dubai',                     bandera: '🇦🇪' },
  { nombre: 'Tokio',           zona: 'Asia/Tokyo',                     bandera: '🇯🇵' },
  { nombre: 'Sídney',          zona: 'Australia/Sydney',               bandera: '🇦🇺' },
  { nombre: 'Ciudad de México',zona: 'America/Mexico_City',            bandera: '🇲🇽' },
  { nombre: 'São Paulo',       zona: 'America/Sao_Paulo',              bandera: '🇧🇷' },
];

// Agrega el ":" automáticamente al escribir la hora (ej: "14" → "14:")
function formatearHora() {
  const input = document.getElementById('hora');
  let valor   = input.value.replace(/\D/g, ''); // solo números

  if (valor.length >= 3) {
    valor = valor.slice(0, 2) + ':' + valor.slice(2, 4);
  }

  input.value = valor;
  document.getElementById('error-hora').textContent = '';
}

// Valida que la hora ingresada sea un formato HH:MM válido
function validarHora(valor) {
  const regex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  return regex.test(valor);
}

function poblarSelect() {
  const select = document.getElementById('zona-origen');
  CIUDADES.forEach((ciudad, i) => {
    const option       = document.createElement('option');
    option.value       = i;
    option.textContent = `${ciudad.bandera} ${ciudad.nombre}`;
    if (ciudad.nombre === 'Buenos Aires') option.selected = true;
    select.appendChild(option);
  });
}

function convertir() {
  const horaInput    = document.getElementById('hora').value.trim();
  const indiceOrigen = parseInt(document.getElementById('zona-origen').value);
  const errorEl      = document.getElementById('error-hora');

  if (!validarHora(horaInput)) {
    errorEl.textContent = 'Ingresá una hora válida (ej: 14:30)';
    document.getElementById('resultados').innerHTML = '';
    return;
  }

  errorEl.textContent = '';

  const [horas, minutos] = horaInput.split(':').map(Number);
  const ciudadOrigen     = CIUDADES[indiceOrigen];

  const ahora       = new Date();
  const fechaOrigen = new Date(Date.UTC(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), horas, minutos));
  const offsetOrigen = getOffsetMinutos(ciudadOrigen.zona, fechaOrigen);
  const fechaUTC     = new Date(fechaOrigen.getTime() + offsetOrigen * 60000);

  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = CIUDADES.map((ciudad, i) => {
    const esOrigen = i === indiceOrigen;

    const horaFormateada = new Intl.DateTimeFormat('es-AR', {
      timeZone: ciudad.zona,
      hour:     '2-digit',
      minute:   '2-digit',
      hour12:   false
    }).format(fechaUTC);

    const nombreZona = new Intl.DateTimeFormat('es-AR', {
      timeZone:     ciudad.zona,
      timeZoneName: 'short'
    }).format(fechaUTC).split(', ')[1] || '';

    return `
      <div class="ciudad-card ${esOrigen ? 'origen' : ''}">
        <div class="ciudad-izq">
          <span class="ciudad-bandera">${ciudad.bandera}</span>
          <div class="ciudad-datos">
            <span class="ciudad-nombre">${ciudad.nombre}${esOrigen ? '<span class="origen-badge">origen</span>' : ''}</span>
            <span class="ciudad-zona">${nombreZona}</span>
          </div>
        </div>
        <span class="ciudad-hora">${horaFormateada}</span>
      </div>
    `;
  }).join('');
}

function getOffsetMinutos(zona, fecha) {
  const utcStr  = fecha.toLocaleString('en-US', { timeZone: 'UTC' });
  const zonaStr = fecha.toLocaleString('en-US', { timeZone: zona });
  return -(new Date(zonaStr) - new Date(utcStr)) / 60000;
}

function setHoraActual() {
  const ahora   = new Date();
  const horas   = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  document.getElementById('hora').value = `${horas}:${minutos}`;
}

poblarSelect();
setHoraActual();
convertir();
