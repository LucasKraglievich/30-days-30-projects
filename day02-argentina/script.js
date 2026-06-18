// Los 3 partidos de Argentina en la fase de grupos del Mundial 2026
var partidos = [
  {
    id: 1,
    local: "Argentina 🇦🇷",
    visitante: "Argelia 🇩🇿",
    fecha: "Martes 16 de junio",
    hora: "22:00 hs"
  },
  {
    id: 2,
    local: "Argentina 🇦🇷",
    visitante: "Austria 🇦🇹",
    fecha: "Lunes 22 de junio",
    hora: "14:00 hs"
  },
  {
    id: 3,
    local: "Argentina 🇦🇷",
    visitante: "Jordania 🇯🇴",
    fecha: "Sábado 27 de junio",
    hora: "23:00 hs"
  }
];

// Esta función crea los partidos en la página
function mostrarPartidos() {
  var contenedor = document.getElementById('partidos');
  var html = '';

  for (var i = 0; i < partidos.length; i++) {
    var p = partidos[i];

    html += '<div class="partido">';
    html += '  <div class="partido-fecha">' + p.fecha + ' · <span>' + p.hora + '</span></div>';
    html += '  <div class="equipos">';
    html += '    <div class="equipo local">' + p.local + '</div>';
    html += '    <div class="inputs-goles">';
    html += '      <input type="number" id="local-' + p.id + '" min="0" max="20" placeholder="0" />';
    html += '      <span>-</span>';
    html += '      <input type="number" id="visitante-' + p.id + '" min="0" max="20" placeholder="0" />';
    html += '    </div>';
    html += '    <div class="equipo visitante">' + p.visitante + '</div>';
    html += '  </div>';
    html += '</div>';
  }

  contenedor.innerHTML = html;

  // Si ya hay predicciones guardadas, las cargo
  cargarPredicciones();
}

// Esta función guarda las predicciones en localStorage
function guardarPredicciones() {
  var predicciones = [];

  for (var i = 0; i < partidos.length; i++) {
    var p = partidos[i];
    var golesLocal     = document.getElementById('local-' + p.id).value;
    var golesVisitante = document.getElementById('visitante-' + p.id).value;

    if (golesLocal !== '' && golesVisitante !== '') {
      predicciones.push({
        id:             p.id,
        local:          p.local,
        visitante:      p.visitante,
        fecha:          p.fecha,
        golesLocal:     golesLocal,
        golesVisitante: golesVisitante
      });
    }
  }

  // Guardo en localStorage
  localStorage.setItem('prode-argentina-2026', JSON.stringify(predicciones));

  // Muestro mensaje de confirmación por 2 segundos
  var mensaje = document.getElementById('mensaje');
  mensaje.style.display = 'block';
  setTimeout(function() {
    mensaje.style.display = 'none';
  }, 2000);

  // Muestro el resumen
  mostrarResumen(predicciones);
}

// Esta función carga las predicciones guardadas en los inputs
function cargarPredicciones() {
  var guardado = localStorage.getItem('prode-argentina-2026');

  if (guardado === null) return;

  var predicciones = JSON.parse(guardado);

  for (var i = 0; i < predicciones.length; i++) {
    var pred = predicciones[i];
    var inputLocal     = document.getElementById('local-' + pred.id);
    var inputVisitante = document.getElementById('visitante-' + pred.id);

    if (inputLocal && inputVisitante) {
      inputLocal.value     = pred.golesLocal;
      inputVisitante.value = pred.golesVisitante;
    }
  }

  mostrarResumen(predicciones);
}

// Esta función muestra el resumen de predicciones
function mostrarResumen(predicciones) {
  if (predicciones.length === 0) return;

  var resumen = document.getElementById('resumen');
  var lista   = document.getElementById('lista-resumen');

  resumen.style.display = 'block';

  var html = '';
  for (var i = 0; i < predicciones.length; i++) {
    var pred = predicciones[i];
    html += '<div class="resumen-item">';
    html += '  <span>' + pred.local + ' vs ' + pred.visitante + '</span>';
    html += '  <span class="resumen-resultado">' + pred.golesLocal + ' - ' + pred.golesVisitante + '</span>';
    html += '</div>';
  }

  lista.innerHTML = html;
}

// Esta función borra todo
function limpiarPredicciones() {
  localStorage.removeItem('prode-argentina-2026');

  for (var i = 0; i < partidos.length; i++) {
    document.getElementById('local-' + partidos[i].id).value     = '';
    document.getElementById('visitante-' + partidos[i].id).value = '';
  }

  document.getElementById('resumen').style.display = 'none';
}

// Arranco cuando carga la página
mostrarPartidos();
