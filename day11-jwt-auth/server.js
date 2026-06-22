const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.json());
const JWT_SECRET = 'mi-clave-secreta-super-segura-2026';
let usuarios = [];
let siguienteId = 1;

// POST /api/registro — crea un usuario nuevo
app.post('/api/registro', async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  // Verifico que el email no esté ya registrado
  const existeUsuario = usuarios.find(u => u.email === email);
  if (existeUsuario) {
    return res.status(400).json({ error: 'Ese email ya está registrado' });
  }

  // "Licuamos" la contraseña con bcrypt antes de guardarla
  // El número 10 es el "costo" del hash — más alto = más seguro pero más lento
  const passwordHasheada = await bcrypt.hash(password, 10);

  const nuevoUsuario = {
    id: siguienteId++,
    email,
    password: passwordHasheada // guardamos el hash, NUNCA la contraseña real
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: nuevoUsuario.id });
});

// POST /api/login — valida credenciales y devuelve un JWT
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  // Busco el usuario por email
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Comparo la contraseña que mandó el usuario con el hash guardado
  // bcrypt.compare "licúa" la nueva contraseña y compara los jugos, no las bananas
  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Si todo está bien, genero el token JWT
  // El "payload" es la info que va adentro del token (nunca pongas la contraseña aquí)
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    JWT_SECRET,
    { expiresIn: '1h' } // el token expira en 1 hora
  );

  res.json({ mensaje: 'Login exitoso', token });
});

// Middleware que verifica el token JWT antes de dejar pasar
function verificarToken(req, res, next) {
  // El token viene en el header así: "Authorization: Bearer eyJxxxx..."
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'No se envió token de autenticación' });
  }

  // Separamos "Bearer" del token real
  const token = authHeader.split(' ')[1];

  try {
    // Verificamos que el token sea válido y no esté vencido
    const datosUsuario = jwt.verify(token, JWT_SECRET);
    req.usuario = datosUsuario; // guardo los datos del usuario para usarlos después
    next(); // todo bien, dejo pasar a la siguiente función
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

// GET /api/perfil — ruta protegida, necesita un token válido
app.get('/api/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Accediste a una ruta protegida 🔒',
    usuario: req.usuario
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

