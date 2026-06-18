// Color actual
let colorActual = '#f8fafc';

// Genera un color HEX aleatorio
function hexAleatorio() {
  const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

// Convierte HEX a RGB para mostrarlo
function hexARgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Determina si el texto debe ser blanco o negro según la luminancia del fondo
// Fórmula estándar WCAG para accesibilidad
function colorTexto(hex) {
  const { r, g, b } = hexARgb(hex);
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.5 ? '#1e293b' : '#ffffff';
}

// Aplica el color a toda la página
function aplicarColor(hex) {
  colorActual = hex;
  const texto  = colorTexto(hex);
  const { r, g, b } = hexARgb(hex);

  // Fondo
  document.getElementById('fondo').style.backgroundColor = hex;

  // Textos
  document.getElementById('hex').textContent       = hex.toUpperCase();
  document.getElementById('rgb').textContent       = `RGB(${r}, ${g}, ${b})`;
  document.getElementById('titulo').style.color    = texto;
  document.getElementById('subtitulo').style.color = texto;
  document.getElementById('hex').style.color       = texto;
  document.getElementById('rgb').style.color       = texto;
  document.getElementById('usuario').style.color   = texto;
  document.getElementById('mensaje').style.color   = texto;

  // Botones heredan el color del texto
  document.querySelectorAll('button').forEach(b => b.style.color = texto);
  document.querySelector('footer').style.color = texto;
}

function generarColor() {
  aplicarColor(hexAleatorio());
  document.getElementById('mensaje').style.display = 'none';
}

function copiarHex() {
  navigator.clipboard.writeText(colorActual.toUpperCase()).then(() => {
    const msg = document.getElementById('mensaje');
    msg.textContent   = `✅ ${colorActual.toUpperCase()} copiado`;
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2000);
  });
}

// Barra espaciadora genera color nuevo
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    generarColor();
  }
});

// Color inicial al cargar
generarColor();
