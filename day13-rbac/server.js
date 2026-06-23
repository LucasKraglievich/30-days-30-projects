const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'mi-clave-secreta-super-segura-2026';

app.use(express.json());

let usuarios = [];
let siguienteId = 1;

// POST /api/registro — crea un usuario con rol
app.post('/api/registro', async (req, res) => {
  const { email, password, rol } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  const existeUsuario = usuarios.find(u => u.email === email);
  if (existeUsuario) {
    return res.status(400).json({ error: 'Ese email ya está registrado' });
  }

  const passwordHasheada = await bcrypt.hash(password, 10);

  // Si no se especifica rol, por defecto es "user"
  // Solo aceptamos "admin" o "user", cualquier otra cosa se ignora
  const rolFinal = rol === 'admin' ? 'admin' : 'user';

  const nuevoUsuario = {
    id: siguienteId++,
    email,
    password: passwordHasheada,
    rol: rolFinal
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: nuevoUsuario.id, rol: nuevoUsuario.rol });
});

// POST /api/login — valida credenciales y devuelve un JWT con el rol incluido
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Ahora el payload del token incluye el rol
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ mensaje: 'Login exitoso', token, rol: usuario.rol });
});

// Middleware que verifica que el token sea válido (igual al día 11)
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'No se envió token de autenticación' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const datosUsuario = jwt.verify(token, JWT_SECRET);
    req.usuario = datosUsuario;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

// Middleware NUEVO que verifica el rol
// Es una "función que devuelve una función" — recibe qué rol se necesita,
// y devuelve el middleware real que hace la verificación
function verificarRol(rolRequerido) {
  return (req, res, next) => {
    // req.usuario ya existe porque verificarToken se ejecutó antes
    if (req.usuario.rol !== rolRequerido) {
      return res.status(403).json({ error: 'No tenés permisos para esta acción' });
    }
    next();
  };
}

// GET /api/perfil — cualquier usuario logueado puede ver su perfil
app.get('/api/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Este es tu perfil',
    usuario: req.usuario
  });
});

// GET /api/admin/usuarios — SOLO accesible para admins
// Fijate que encadenamos los dos middlewares: primero verificarToken,
// después verificarRol('admin'). Si cualquiera de los dos falla, no llega a la ruta final.
app.get('/api/admin/usuarios', verificarToken, verificarRol('admin'), (req, res) => {
  // Devuelvo la lista de usuarios, sin mostrar las contraseñas hasheadas
  const usuariosSinPassword = usuarios.map(u => ({
    id: u.id,
    email: u.email,
    rol: u.rol
  }));

  res.json(usuariosSinPassword);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
