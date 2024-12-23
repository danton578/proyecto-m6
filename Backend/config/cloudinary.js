const cloudinary = require("cloudinary").v2;

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    // Verificar si la conexión se realizó correctamente
    if (cloudinary.config().cloud_name) {
      console.log("Conectado a Cloudinary");
    } else {
      console.error("No se pudo conectar a Cloudinary: cloud_name no definido");
    }
  } catch (error) {
    console.error(`Error al conectar con Cloudinary: ${error.message}`);
  }
};

module.exports = connectCloudinary;
