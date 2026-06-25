const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Creo la carpeta "uploads" si no existe — ahí van a vivir los archivos subidos
const carpetaUploads = path.join(__dirname, 'uploads');
if (!fs.existsSync(carpetaUploads)) {
  fs.mkdirSync(carpetaUploads);
}
// Configuro el "storage" de multer — dónde y cómo se guardan los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaUploads); // los guardo en la carpeta "uploads"
  },
  filename: (req, file, cb) => {
    // Le pongo timestamp + nombre original para evitar que dos archivos
    // con el mismo nombre se pisen entre sí
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  }
});

// Filtro de tipo de archivo — solo permito imágenes
const filtroArchivos = (req, file, cb) => {
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true); // acepto el archivo
  } else {
    cb(new Error('Solo se permiten imágenes JPG, PNG o WEBP'), false);
  }
};

// Armo el middleware de multer con la configuración de arriba
const upload = multer({
  storage: storage,
  fileFilter: filtroArchivos,
  limits: { fileSize: 5 * 1024 * 1024 } // máximo 5 MB
});

// POST /api/upload — recibe un archivo de imagen
// upload.single('imagen') le dice a multer: "esperá UN archivo, en el campo llamado 'imagen'"
app.post('/api/upload', upload.single('imagen'), (req, res) => {
  // Si llegamos hasta aquí, multer ya guardó el archivo en la carpeta uploads

  if (!req.file) {
    return res.status(400).json({ error: 'No se envió ningún archivo' });
  }

  res.status(201).json({
    mensaje: 'Archivo subido con éxito',
    archivo: {
      nombreOriginal: req.file.originalname,
      nombreGuardado: req.file.filename,
      tamaño: req.file.size,
      tipo: req.file.mimetype
    }
  });
});

// Middleware para manejar errores de multer (archivo muy grande, tipo no permitido)
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: 'Error al subir el archivo: ' + error.message });
  }
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});