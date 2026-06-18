// Banco de preguntas sobre la Final NBA 2026 e historia de la NBA
const PREGUNTAS = [
  {
    pregunta: "¿Cuál es el marcador actual de la Final NBA 2026?",
    opciones: ["Spurs 3 - Knicks 1", "Knicks 3 - Spurs 1", "Knicks 2 - Spurs 2", "Spurs 2 - Knicks 2"],
    correcta: 1,
    dato: "Los Knicks ganaron el Game 1, 2 y 4. Los Spurs el Game 3."
  },
  {
    pregunta: "¿En qué ciudad juegan de local los San Antonio Spurs?",
    opciones: ["Dallas", "Houston", "San Antonio", "Austin"],
    correcta: 2,
    dato: "Los Spurs juegan en el Frost Bank Center en San Antonio, Texas."
  },
  {
    pregunta: "¿Cuántos campeonatos de la NBA ganaron los Spurs históricamente?",
    opciones: ["3", "4", "5", "6"],
    correcta: 2,
    dato: "Los Spurs ganaron en 1999, 2003, 2005, 2007 y 2014."
  },
  {
    pregunta: "¿Cuántos títulos de la NBA ganaron los New York Knicks?",
    opciones: ["0", "1", "2", "3"],
    correcta: 2,
    dato: "Los Knicks ganaron en 1970 y 1973, ambos con Willis Reed."
  },
  {
    pregunta: "¿Quién es el máximo goleador histórico de la NBA?",
    opciones: ["Michael Jordan", "Kobe Bryant", "LeBron James", "Kareem Abdul-Jabbar"],
    correcta: 2,
    dato: "LeBron James superó a Kareem Abdul-Jabbar en febrero de 2023."
  },
  {
    pregunta: "¿Cuántos equipos participan en los Playoffs de la NBA?",
    opciones: ["8", "12", "16", "20"],
    correcta: 2,
    dato: "16 equipos clasifican a Playoffs, 8 por conferencia."
  },
  {
    pregunta: "¿Cuántos partidos tiene como máximo una serie de Playoffs de la NBA?",
    opciones: ["5", "6", "7", "9"],
    correcta: 2,
    dato: "Las series son al mejor de 7. Gana quien llega primero a 4 victorias."
  },
  {
    pregunta: "¿En qué ciudad juegan de local los New York Knicks?",
    opciones: ["Brooklyn", "Newark", "Nueva York", "Boston"],
    correcta: 2,
    dato: "Los Knicks juegan en el Madison Square Garden, considerado 'el estadio más famoso del mundo'."
  },
  {
    pregunta: "¿Qué significa MVP en la NBA?",
    opciones: ["Most Valuable Player", "Most Victorious Player", "Most Versatile Player", "Most Voted Player"],
    correcta: 0,
    dato: "MVP = Most Valuable Player. Se entrega al mejor jugador de la temporada regular y también al mejor de las Finales."
  },
  {
    pregunta: "¿Cuántos cuartos tiene un partido de NBA?",
    opciones: ["2", "3", "4", "5"],
    correcta: 2,
    dato: "Un partido de NBA tiene 4 cuartos de 12 minutos cada uno."
  }
];

// Estado del juego
let indiceActual  = 0;
let puntaje       = 0;
let timerInterval = null;
let segundos      = 15;
let respondido    = false;
let historial     = []; // guardo cada respuesta para el resumen final

// Mezcla el array de preguntas para que no siempre salgan en el mismo orden
function mezclar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

let preguntasMezcladas = [];

function empezar() {
  preguntasMezcladas = mezclar(PREGUNTAS);
  indiceActual = 0;
  puntaje      = 0;
  historial    = [];

  document.getElementById('pantalla-inicio').style.display  = 'none';
  document.getElementById('pantalla-juego').style.display   = 'block';
  document.getElementById('pantalla-resultado').style.display = 'none';

  mostrarPregunta();
}

function mostrarPregunta() {
  respondido = false;
  segundos   = 15;

  const pregunta = preguntasMezcladas[indiceActual];

  // Actualizo el progreso
  document.getElementById('progreso').textContent =
    `Pregunta ${indiceActual + 1} / ${preguntasMezcladas.length}`;

  // Muestro el texto de la pregunta
  document.getElementById('pregunta-texto').textContent = pregunta.pregunta;

  // Genero los botones de opciones
  const contenedor = document.getElementById('opciones');
  contenedor.innerHTML = '';

  pregunta.opciones.forEach((opcion, index) => {
    const btn = document.createElement('button');
    btn.className    = 'opcion-btn';
    btn.textContent  = opcion;
    btn.onclick      = () => responder(index);
    contenedor.appendChild(btn);
  });

  // Oculto el feedback anterior
  const feedback = document.getElementById('feedback');
  feedback.style.display = 'none';
  feedback.className     = 'feedback';

  // Reseteo el timer visual
  const barra = document.getElementById('barra-timer');
  barra.style.width           = '100%';
  barra.style.transition      = 'none';
  barra.className             = 'barra-timer';

  const timerTexto = document.getElementById('timer');
  timerTexto.textContent = '15';
  timerTexto.parentElement.className = 'timer-box';

  // Arranco el countdown después de un frame para que la transición CSS funcione
  requestAnimationFrame(() => {
    barra.style.transition = 'width 1s linear';
    iniciarTimer();
  });
}

function iniciarTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    segundos--;

    const timerTexto = document.getElementById('timer');
    const barra      = document.getElementById('barra-timer');

    timerTexto.textContent = segundos;
    barra.style.width      = (segundos / 15 * 100) + '%';

    // Pongo rojo cuando quedan 5 segundos o menos
    if (segundos <= 5) {
      barra.className = 'barra-timer urgente';
      timerTexto.parentElement.className = 'timer-box urgente';
    }

    // Se acabó el tiempo — cuento como incorrecta
    if (segundos <= 0) {
      clearInterval(timerInterval);
      if (!respondido) {
        responder(-1); // -1 indica que se acabó el tiempo
      }
    }
  }, 1000);
}

function responder(indiceElegido) {
  if (respondido) return;
  respondido = true;
  clearInterval(timerInterval);

  const pregunta   = preguntasMezcladas[indiceActual];
  const esCorrecta = indiceElegido === pregunta.correcta;

  if (esCorrecta) puntaje++;

  // Guardo en historial para el resumen
  historial.push({
    pregunta:  pregunta.pregunta,
    correcta:  esCorrecta,
    respuesta: indiceElegido === -1 ? 'Tiempo agotado' : pregunta.opciones[indiceElegido],
    correctaTexto: pregunta.opciones[pregunta.correcta]
  });

  // Marco visualmente los botones
  const botones = document.querySelectorAll('.opcion-btn');
  botones.forEach((btn, i) => {
    btn.disabled = true;
    if (i === pregunta.correcta) btn.classList.add('correcta');
    if (i === indiceElegido && !esCorrecta) btn.classList.add('incorrecta');
  });

  // Muestro feedback
  const feedback = document.getElementById('feedback');
  if (indiceElegido === -1) {
    feedback.textContent  = `⏰ Tiempo agotado — Era: ${pregunta.opciones[pregunta.correcta]}`;
    feedback.className    = 'feedback incorrecto';
  } else if (esCorrecta) {
    feedback.textContent  = `✅ ¡Correcto! ${pregunta.dato}`;
    feedback.className    = 'feedback correcto';
  } else {
    feedback.textContent  = `❌ Incorrecto — Era: ${pregunta.opciones[pregunta.correcta]}`;
    feedback.className    = 'feedback incorrecto';
  }
  feedback.style.display = 'block';

  // Paso a la siguiente pregunta después de 2 segundos
  setTimeout(() => {
    indiceActual++;
    if (indiceActual < preguntasMezcladas.length) {
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  }, 2000);
}

function mostrarResultado() {
  document.getElementById('pantalla-juego').style.display    = 'none';
  document.getElementById('pantalla-resultado').style.display = 'block';

  const total = preguntasMezcladas.length;

  // Emoji y título según el puntaje
  let emoji, titulo;
  if (puntaje === total) {
    emoji  = '🏆'; titulo = '¡Perfecto! Sos un crack de la NBA';
  } else if (puntaje >= total * 0.7) {
    emoji  = '🏀'; titulo = '¡Muy bien! Sabés bastante de NBA';
  } else if (puntaje >= total * 0.4) {
    emoji  = '😅'; titulo = 'Pasable... pero podés mejorar';
  } else {
    emoji  = '😬'; titulo = 'Necesitás ver más partidos';
  }

  document.getElementById('resultado-emoji').textContent   = emoji;
  document.getElementById('resultado-titulo').textContent  = titulo;
  document.getElementById('resultado-puntaje').textContent =
    `${puntaje} / ${total} correctas`;

  // Resumen de respuestas
  const resumen = document.getElementById('resumen-respuestas');
  resumen.innerHTML = historial.map(item => `
    <div class="resumen-item">
      <span class="resumen-icono">${item.correcta ? '✅' : '❌'}</span>
      <span>${item.pregunta}</span>
    </div>
  `).join('');
}

function reiniciar() {
  document.getElementById('pantalla-resultado').style.display = 'none';
  document.getElementById('pantalla-inicio').style.display    = 'block';
}
