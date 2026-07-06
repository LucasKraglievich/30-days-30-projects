const express = require('express');
const app = express();

app.use(express.json());

// Base de datos en memoria para los tests
let tareas = [];
let siguienteId = 1;

// GET /api/tareas
app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});

// POST /api/tareas
app.post('/api/tareas', (req, res) => {
  const { titulo } = req.body;
  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }
  const nuevaTarea = { id: siguienteId++, titulo: titulo.trim(), completada: false };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// DELETE /api/tareas/:id
app.delete('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  tareas.splice(indice, 1);
  res.status(204).send();
});

// Exporto la app SIN hacer app.listen()
// Así Supertest puede importarla y hacer requests sin levantar un servidor real
module.exports = { app, tareas };

// Solo arranco el servidor si este archivo se ejecuta directamente
if (require.main === module) {
  app.listen(3000, () => console.log('✅ Servidor corriendo en http://localhost:3000'));
}
