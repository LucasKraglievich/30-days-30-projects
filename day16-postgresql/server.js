const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(express.json());

// Pool de conexiones a PostgreSQL
// Un "pool" maneja múltiples conexiones simultáneas eficientemente
const pool = new Pool({
  host:     'localhost',
  port:     5432,
  database: 'tareas_db',
  user:     'postgres',
  password: 'Lucaskra09' // la contraseña que pusiste al instalar
});
// Creo la tabla si no existe — igual que en SQLite pero con sintaxis PostgreSQL
// SERIAL es el equivalente de AUTOINCREMENT en PostgreSQL
async function iniciarDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tareas (
      id        SERIAL PRIMARY KEY,
      titulo    TEXT NOT NULL,
      completada BOOLEAN DEFAULT false
    )
  `);
  console.log('✅ Tabla tareas lista');
}

// GET /api/tareas — todas las tareas
app.get('/api/tareas', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM tareas ORDER BY id');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tareas — crear tarea
app.post('/api/tareas', async (req, res) => {
  const { titulo } = req.body;
  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }
  try {
    // $1 es el placeholder de PostgreSQL (en SQLite era ?)
    const resultado = await pool.query(
      'INSERT INTO tareas (titulo) VALUES ($1) RETURNING *',
      [titulo.trim()]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tareas/:id — actualizar tarea
app.put('/api/tareas/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, completada } = req.body;
  try {
    const actual = await pool.query('SELECT * FROM tareas WHERE id = $1', [id]);
    if (actual.rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    const tarea = actual.rows[0];
    const nuevoTitulo    = titulo     !== undefined ? titulo.trim() : tarea.titulo;
    const nuevaCompletada = completada !== undefined ? completada    : tarea.completada;
    const resultado = await pool.query(
      'UPDATE tareas SET titulo = $1, completada = $2 WHERE id = $3 RETURNING *',
      [nuevoTitulo, nuevaCompletada, id]
    );
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tareas/:id — eliminar tarea
app.delete('/api/tareas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Arranco el servidor después de conectar a la DB
iniciarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
});