const request = require('supertest');
const { app, tareas } = require('./server');

// Antes de cada test, limpiamos el array de tareas
// para que los tests sean independientes entre sí
beforeEach(() => {
  tareas.length = 0;
});

// describe agrupa tests relacionados
describe('GET /api/tareas', () => {
  test('devuelve un array vacío cuando no hay tareas', async () => {
    const res = await request(app).get('/api/tareas');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('devuelve las tareas existentes', async () => {
    // Primero creo una tarea
    await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Tarea de prueba' });

    const res = await request(app).get('/api/tareas');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].titulo).toBe('Tarea de prueba');
  });
});

describe('POST /api/tareas', () => {
  test('crea una tarea correctamente', async () => {
    const res = await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Nueva tarea' });

    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe('Nueva tarea');
    expect(res.body.completada).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  test('devuelve 400 si el título está vacío', async () => {
    const res = await request(app)
      .post('/api/tareas')
      .send({ titulo: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('devuelve 400 si no se manda título', async () => {
    const res = await request(app)
      .post('/api/tareas')
      .send({});

    expect(res.status).toBe(400);
  });
});

describe('DELETE /api/tareas/:id', () => {
  test('elimina una tarea existente', async () => {
    // Primero creo una tarea
    const crear = await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Tarea a borrar' });

    const id = crear.body.id;

    const res = await request(app).delete(`/api/tareas/${id}`);
    expect(res.status).toBe(204);
  });

  test('devuelve 404 si la tarea no existe', async () => {
    const res = await request(app).delete('/api/tareas/999');
    expect(res.status).toBe(404);
  });
});