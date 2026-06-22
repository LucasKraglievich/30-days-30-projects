const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

app.use(express.json());

// Esto crea (o abre si ya existe) un archivo llamado tareas.db
// Ese archivo ES la base de datos completa — todo vive ahí
const db = new Database('tareas.db');

// Creo la tabla "tareas" si no existe todavía
// Esto se ejecuta cada vez que arranca el servidor, pero si la tabla
// ya existe, "IF NOT EXISTS" hace que no pase nada (no la duplica)
db.exec(`
  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    completada INTEGER DEFAULT 0
  )
`);

// GET /api/tareas — devuelve todas las tareas
app.get('/api/tareas', (req, res) => {
  // SELECT * FROM tareas significa "traeme todas las columnas, de todas las filas"
  const tareas = db.prepare('SELECT * FROM tareas').all();
  res.json(tareas);
});

// POST /api/tareas — crea una tarea nueva
app.post('/api/tareas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  // INSERT INTO agrega una fila nueva a la tabla
  // El "?" es un placeholder que se reemplaza por el valor real de forma segura
  // (esto evita un ataque llamado "SQL injection")
  const resultado = db.prepare('INSERT INTO tareas (titulo) VALUES (?)').run(titulo.trim());

  // resultado.lastInsertRowid me da el ID que se generó automáticamente
  const nuevaTarea = db.prepare('SELECT * FROM tareas WHERE id = ?').get(resultado.lastInsertRowid);

  res.status(201).json(nuevaTarea);
});

// PUT /api/tareas/:id — actualiza una tarea
app.put('/api/tareas/:id', (req, res) => {
  const id = req.params.id;
  const { titulo, completada } = req.body;

  // Primero verifico que la tarea exista
  const tarea = db.prepare('SELECT * FROM tareas WHERE id = ?').get(id);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // Si no me mandaron un campo nuevo, dejo el valor que ya tenía
  const nuevoTitulo = titulo !== undefined ? titulo.trim() : tarea.titulo;
  const nuevaCompletada = completada !== undefined ? (completada ? 1 : 0) : tarea.completada;

  // UPDATE modifica una fila existente
  db.prepare('UPDATE tareas SET titulo = ?, completada = ? WHERE id = ?')
    .run(nuevoTitulo, nuevaCompletada, id);

  const tareaActualizada = db.prepare('SELECT * FROM tareas WHERE id = ?').get(id);
  res.json(tareaActualizada);
});

// DELETE /api/tareas/:id — elimina una tarea
app.delete('/api/tareas/:id', (req, res) => {
  const id = req.params.id;

  const tarea = db.prepare('SELECT * FROM tareas WHERE id = ?').get(id);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // DELETE FROM borra la fila que coincide con la condición WHERE
  db.prepare('DELETE FROM tareas WHERE id = ?').run(id);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});