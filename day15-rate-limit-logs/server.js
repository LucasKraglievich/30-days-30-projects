const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(express.json());
// morgan('dev') imprime en la consola cada petición que llega:
// método, ruta, status de respuesta, y tiempo que tardó
app.use(morgan('dev'));
// Configuro el límite de peticiones
const limiter = rateLimit({
  windowMs: 60 * 1000, // ventana de tiempo: 60 segundos (1 minuto)
  max: 5,               // máximo 5 peticiones por esa ventana de tiempo
  message: { error: 'Demasiadas peticiones. Probá de nuevo en un minuto.' },
  standardHeaders: true, // incluye info del límite en los headers de respuesta
  legacyHeaders: false
});

// Aplico el límite SOLO a una ruta específica (podría ser a todo el server también)
app.use('/api/', limiter);
// GET /api/test — la usamos para probar el rate limiting
app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Petición exitosa ✅' });
});

// GET / — esta ruta NO tiene límite porque no empieza con /api/
app.get('/', (req, res) => {
  res.json({ mensaje: 'Bienvenido, esta ruta no tiene límite' });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});