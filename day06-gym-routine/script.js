// Base de datos de ejercicios por músculo y nivel
const RUTINAS = {
  pecho: {
    principiante: [
      { nombre: "Press de banca con barra",     detalle: "Agarre ancho, codos a 45°",         series: "3", reps: "10" },
      { nombre: "Aperturas con mancuernas",      detalle: "Codos levemente flexionados",        series: "3", reps: "12" },
      { nombre: "Flexiones de brazos",           detalle: "Cuerpo recto, pecho al suelo",       series: "3", reps: "12" },
      { nombre: "Press inclinado con mancuernas",detalle: "Banco a 30-45°",                     series: "3", reps: "10" },
    ],
    intermedio: [
      { nombre: "Press de banca con barra",      detalle: "70-80% del peso máximo",             series: "4", reps: "8"  },
      { nombre: "Press inclinado con barra",     detalle: "Banco a 30°, agarre medio",          series: "4", reps: "8"  },
      { nombre: "Aperturas en polea cruzada",    detalle: "Cables altos, contracción en centro",series: "3", reps: "12" },
      { nombre: "Press declinado con barra",     detalle: "Activa la parte inferior del pecho", series: "3", reps: "10" },
      { nombre: "Fondos en paralelas",           detalle: "Inclinate hacia adelante",           series: "3", reps: "12" },
    ],
    avanzado: [
      { nombre: "Press de banca pesado",         detalle: "85-90% del peso máximo",             series: "5", reps: "5"  },
      { nombre: "Press inclinado con barra",     detalle: "Supersetear con aperturas",          series: "4", reps: "6"  },
      { nombre: "Aperturas en polea baja",       detalle: "Cables bajos, contracción arriba",   series: "4", reps: "10" },
      { nombre: "Fondos con lastre",             detalle: "Añadí peso con cinturón",            series: "4", reps: "8"  },
      { nombre: "Pullover con mancuerna",        detalle: "Expansión de caja torácica",         series: "3", reps: "12" },
      { nombre: "Press de banca con agarre cerrado", detalle: "Finalizar con enfoque en tríceps", series: "3", reps: "10" },
    ]
  },
  espalda: {
    principiante: [
      { nombre: "Dominadas asistidas",           detalle: "Agarre prono, amplitud completa",    series: "3", reps: "8"  },
      { nombre: "Remo con mancuerna",            detalle: "Apoyate en banco, espalda recta",    series: "3", reps: "10" },
      { nombre: "Jalón al pecho en polea",       detalle: "Agarre ancho, codos hacia abajo",    series: "3", reps: "12" },
      { nombre: "Remo en polea baja",            detalle: "Espalda erguida, codos pegados",     series: "3", reps: "12" },
    ],
    intermedio: [
      { nombre: "Dominadas con peso corporal",   detalle: "Agarre neutro y prono alternados",   series: "4", reps: "8"  },
      { nombre: "Remo con barra",                detalle: "45° de inclinación, agarre prono",   series: "4", reps: "8"  },
      { nombre: "Jalón al pecho en polea",       detalle: "Agarre ancho y cerrado alternados",  series: "3", reps: "10" },
      { nombre: "Remo en máquina",               detalle: "Contracción máxima al final",        series: "3", reps: "12" },
      { nombre: "Pull-over en polea",            detalle: "Brazos extendidos, control total",   series: "3", reps: "12" },
    ],
    avanzado: [
      { nombre: "Dominadas con lastre",          detalle: "Cinturón con disco, ROM completo",   series: "5", reps: "6"  },
      { nombre: "Remo con barra T",              detalle: "Máximo peso con técnica perfecta",   series: "4", reps: "8"  },
      { nombre: "Remo con mancuerna pesado",     detalle: "Drop set en la última serie",        series: "4", reps: "6"  },
      { nombre: "Jalón al pecho detrás del cuello", detalle: "Solo si tenés movilidad suficiente", series: "3", reps: "10" },
      { nombre: "Remo en polea alta",            detalle: "Enfocado en romboides y trapecio",   series: "3", reps: "12" },
      { nombre: "Peso muerto rumano",            detalle: "Bisagra de cadera, espalda neutra",  series: "4", reps: "8"  },
    ]
  },
  piernas: {
    principiante: [
      { nombre: "Sentadilla con peso corporal",  detalle: "Rodillas alineadas con pies",        series: "3", reps: "15" },
      { nombre: "Prensa de piernas",             detalle: "Pies al ancho de hombros",           series: "3", reps: "12" },
      { nombre: "Extensiones de cuádriceps",     detalle: "Máquina, control en la bajada",      series: "3", reps: "12" },
      { nombre: "Curl de isquiotibiales",        detalle: "Máquina acostado",                   series: "3", reps: "12" },
    ],
    intermedio: [
      { nombre: "Sentadilla con barra",          detalle: "60-70% del peso máximo",             series: "4", reps: "10" },
      { nombre: "Prensa de piernas",             detalle: "Pies altos para más glúteo",         series: "4", reps: "10" },
      { nombre: "Estocadas con mancuernas",      detalle: "Paso largo, rodilla al suelo",       series: "3", reps: "12" },
      { nombre: "Curl de isquiotibiales",        detalle: "Máquina, uni y bilateral",           series: "3", reps: "12" },
      { nombre: "Elevación de pantorrillas",     detalle: "Rango completo de movimiento",       series: "4", reps: "15" },
    ],
    avanzado: [
      { nombre: "Sentadilla profunda con barra", detalle: "80-85% del peso máximo",             series: "5", reps: "5"  },
      { nombre: "Sentadilla frontal",            detalle: "Espalda vertical, codos arriba",     series: "4", reps: "6"  },
      { nombre: "Peso muerto",                   detalle: "Convencional, espalda neutra",       series: "4", reps: "5"  },
      { nombre: "Hack squat",                    detalle: "Talones elevados, foco en cuád",     series: "3", reps: "10" },
      { nombre: "Extensiones + curl superserie", detalle: "Sin descanso entre ejercicios",      series: "4", reps: "12" },
      { nombre: "Elevación de pantorrillas pesada", detalle: "Drop set en última serie",        series: "4", reps: "15" },
    ]
  },
  hombros: {
    principiante: [
      { nombre: "Press militar con mancuernas",  detalle: "Sentado, espalda recta",             series: "3", reps: "10" },
      { nombre: "Elevaciones laterales",         detalle: "Codos levemente flexionados",        series: "3", reps: "12" },
      { nombre: "Elevaciones frontales",         detalle: "Alternadas, hasta altura de hombro", series: "3", reps: "12" },
      { nombre: "Pájaro con mancuernas",         detalle: "Inclinado, trabaja deltoides posterior", series: "3", reps: "12" },
    ],
    intermedio: [
      { nombre: "Press militar con barra",       detalle: "De pie o sentado, barra al frente",  series: "4", reps: "8"  },
      { nombre: "Elevaciones laterales",         detalle: "Peso moderado, 4 series estrictas",  series: "4", reps: "12" },
      { nombre: "Remo al cuello",                detalle: "Agarre ancho, codos arriba",         series: "3", reps: "10" },
      { nombre: "Pájaro en máquina",             detalle: "Deltoides posterior, contracción",   series: "3", reps: "12" },
      { nombre: "Press Arnold",                  detalle: "Rotación completa del hombro",       series: "3", reps: "10" },
    ],
    avanzado: [
      { nombre: "Press militar con barra pesado",detalle: "85% del máximo, técnica estricta",   series: "5", reps: "5"  },
      { nombre: "Elevaciones laterales en polea",detalle: "Cable bajo, tensión constante",      series: "4", reps: "12" },
      { nombre: "Press mancuernas sentado",      detalle: "Drop set en la última serie",        series: "4", reps: "8"  },
      { nombre: "Remo al cuello en polea",       detalle: "Cable, codos altos",                 series: "3", reps: "12" },
      { nombre: "Pájaro con mancuernas pesado",  detalle: "Deltoides posterior, ROM completo",  series: "4", reps: "10" },
      { nombre: "Face pull en polea",            detalle: "Rotación externa, salud del hombro", series: "3", reps: "15" },
    ]
  },
  biceps: {
    principiante: [
      { nombre: "Curl con mancuernas alterno",   detalle: "De pie, supinación al subir",        series: "3", reps: "12" },
      { nombre: "Curl con barra recta",          detalle: "Codos pegados al cuerpo",            series: "3", reps: "10" },
      { nombre: "Curl martillo",                 detalle: "Agarre neutro, trabaja braquial",    series: "3", reps: "12" },
      { nombre: "Curl concentrado",              detalle: "Sentado, codo apoyado en rodilla",   series: "3", reps: "12" },
    ],
    intermedio: [
      { nombre: "Curl con barra Z",              detalle: "Menos estrés en muñecas",            series: "4", reps: "10" },
      { nombre: "Curl en polea baja",            detalle: "Tensión constante durante todo el ROM", series: "3", reps: "12" },
      { nombre: "Curl martillo con mancuernas",  detalle: "Bíceps braquial y braquiorradial",   series: "3", reps: "12" },
      { nombre: "Curl araña",                    detalle: "Banco inclinado, codos fijos",       series: "3", reps: "10" },
      { nombre: "Curl Scott",                    detalle: "Máquina o banco Scott, ROM completo", series: "3", reps: "10" },
    ],
    avanzado: [
      { nombre: "Curl con barra pesado",         detalle: "Sin balanceo, técnica estricta",     series: "4", reps: "8"  },
      { nombre: "Curl en polea + curl mancuerna",detalle: "Superserie sin descanso",            series: "4", reps: "10" },
      { nombre: "Curl inclinado con mancuernas", detalle: "Banco a 45°, máximo estiramiento",  series: "3", reps: "10" },
      { nombre: "Curl Scott pesado",             detalle: "Drop set en la última serie",        series: "3", reps: "8"  },
      { nombre: "Curl martillo en polea",        detalle: "Cuerda, tensión constante",          series: "3", reps: "12" },
    ]
  },
  triceps: {
    principiante: [
      { nombre: "Press francés con mancuerna",   detalle: "Acostado, codos quietos",            series: "3", reps: "12" },
      { nombre: "Extensión en polea alta",       detalle: "Barra recta, codos pegados",         series: "3", reps: "12" },
      { nombre: "Fondos entre bancos",           detalle: "Piernas extendidas para más carga",  series: "3", reps: "12" },
      { nombre: "Press cerrado con barra",       detalle: "Agarre estrecho, codos adentro",     series: "3", reps: "10" },
    ],
    intermedio: [
      { nombre: "Press francés con barra Z",     detalle: "Menos estrés en codos",              series: "4", reps: "10" },
      { nombre: "Extensión en polea con cuerda", detalle: "Separar la cuerda al bajar",         series: "4", reps: "12" },
      { nombre: "Fondos en paralelas",           detalle: "Cuerpo vertical, foco en tríceps",   series: "3", reps: "12" },
      { nombre: "Press cerrado con barra",       detalle: "80% del máximo, técnica estricta",   series: "3", reps: "8"  },
      { nombre: "Patada de tríceps",             detalle: "Inclinado, codo fijo, extensión completa", series: "3", reps: "12" },
    ],
    avanzado: [
      { nombre: "Press cerrado pesado",          detalle: "85% del máximo, 5 series",           series: "5", reps: "5"  },
      { nombre: "Press francés + extensión polea", detalle: "Superserie para máximo volumen",   series: "4", reps: "10" },
      { nombre: "Fondos con lastre",             detalle: "Cinturón con disco",                 series: "4", reps: "8"  },
      { nombre: "Extensión en polea con cuerda", detalle: "Drop set en última serie",           series: "4", reps: "12" },
      { nombre: "Patada de tríceps en polea",    detalle: "Cable bajo, tensión constante",      series: "3", reps: "12" },
    ]
  }
};

// Iconos por grupo muscular
const ICONOS = {
  pecho: '🫁', espalda: '🔙', piernas: '🦵',
  hombros: '🏋️', biceps: '💪', triceps: '🤜'
};

// Estado actual de selección
let musculoActual = 'pecho';
let nivelActual   = 'principiante';

function seleccionarMusculo(musculo, btn) {
  musculoActual = musculo;
  // Quito la clase activo de todos y la pongo solo en el clickeado
  document.querySelectorAll('#musculos .opcion-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
}

function seleccionarNivel(nivel, btn) {
  nivelActual = nivel;
  document.querySelectorAll('#niveles .opcion-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
}

// Genera y muestra la rutina según la selección actual
function generarRutina() {
  const ejercicios = RUTINAS[musculoActual][nivelActual];

  // Nombres formateados para el título
  const nombreMusculo = {
    pecho: 'Pecho', espalda: 'Espalda', piernas: 'Piernas',
    hombros: 'Hombros', biceps: 'Bíceps', triceps: 'Tríceps'
  };
  const nombreNivel = {
    principiante: 'Principiante', intermedio: 'Intermedio', avanzado: 'Avanzado'
  };

  document.getElementById('resultado-titulo').textContent =
    `${nombreMusculo[musculoActual]} · ${nombreNivel[nivelActual]}`;

  // Genero las cards de ejercicios
  const contenedor = document.getElementById('ejercicios');
  contenedor.innerHTML = ejercicios.map((ej, i) => `
    <div class="ejercicio-card">
      <div class="ejercicio-icono">${i + 1}</div>
      <div class="ejercicio-info">
        <p class="ejercicio-num">Ejercicio ${i + 1}</p>
        <p class="ejercicio-nombre">${ej.nombre}</p>
        <p class="ejercicio-detalle">${ej.detalle}</p>
      </div>
      <div class="ejercicio-series">
        <p class="series-valor">${ej.series}×${ej.reps}</p>
        <p class="series-label">series×reps</p>
      </div>
    </div>
  `).join('');

  document.getElementById('resultado').style.display = 'block';
  document.getElementById('mensaje-copiado').style.display = 'none';

  // Scroll suave hacia el resultado
  document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
}

// Copia la rutina como texto plano al portapapeles
function copiarRutina() {
  const ejercicios = RUTINAS[musculoActual][nivelActual];
  const titulo     = document.getElementById('resultado-titulo').textContent;

  let texto = `💪 Rutina: ${titulo}\n\n`;
  ejercicios.forEach((ej, i) => {
    texto += `${i + 1}. ${ej.nombre} — ${ej.series} series × ${ej.reps} reps\n`;
    texto += `   ${ej.detalle}\n\n`;
  });

  navigator.clipboard.writeText(texto).then(() => {
    const msg = document.getElementById('mensaje-copiado');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2000);
  });
}

// Genero la rutina por defecto al cargar
generarRutina();
