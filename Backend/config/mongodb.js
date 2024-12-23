const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Intenta conectar a la base de datos MongoDB usando la URI almacenada en las variables de entorno
    await mongoose.connect(process.env.MONGODB_URI);
    // Muestra un mensaje en la consola si la conexión es exitosa
    console.log("Connected to MongoDB");
  } catch (error) {
    // Muestra el error en la consola si la conexión falla
    console.log("MONGODB_URI ERROR DE CONEXION CON LA BASE");
    console.error(error);
    // Termina el proceso con un código de error
    process.exit(1);
  }
};

module.exports = connectDB;
