const multer = require("multer");

// Configuración de Multer para almacenar archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se almacenan los archivos
  },
  filename: function (req, file, cb) {
    // Genera un nombre único para cada archivo
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
module.exports = upload;
