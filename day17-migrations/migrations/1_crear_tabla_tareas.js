exports.up = (pgm) => {
  pgm.createTable('tareas', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    titulo: {
      type: 'text',
      notNull: true
    },
    completada: {
      type: 'boolean',
      default: false
    },
    creado_en: {
      type: 'timestamp',
      default: pgm.func('NOW()')
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('tareas');
};