exports.up = (pgm) => {
  pgm.addColumn('tareas', {
    descripcion: {
      type: 'text',
      default: null
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('tareas', 'descripcion');
};
