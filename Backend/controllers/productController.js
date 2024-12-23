const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const crypto = require("crypto");
const productModel = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, subcategoria, top_five } =
      req.body;
    //console.log(req.file);

    // Verifica si el producto ya existe
    const existingProduct = await productModel.findOne({ nombre });

    if (existingProduct) {
      fs.unlinkSync(req.file.path); // Eliminar el archivo loc
      return res
        .status(400)
        .json({ success: false, message: "El producto ya existe" });
    } else {
      // Verifica si se ha cargado la imagen en la carpeta local
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Imagen requerida" });
      }
    }

    // Generar timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // Crear la cadena a firmar
    //const stringToSign = `timestamp=${timestamp}&folder=productos`;
    const stringToSign = `timestamp=${timestamp}`;

    // Generar la firma utilizando la clave secreta de Cloudinary
    const signature = crypto
      .createHash("sha1")
      .update(stringToSign + process.env.CLOUDINARY_SECRET_KEY)
      .digest("hex");

    console.log("String to sign:", stringToSign);
    console.log("Generated Signature:", signature);

    // Subir la imagen a Cloudinary con los parámetros adicionales
    const result = await cloudinary.uploader.upload(req.file.path, {
      timestamp,
      signature, // Agregar la firma a la solicitud
      resource_type: "image",
      api_key: process.env.CLOUDINARY_API_KEY,
    });

    // Crear el nuevo producto con la URL de la imagen en Cloudinary
    const newProduct = new productModel({
      nombre,
      descripcion,
      precio,
      categoria,
      subcategoria,
      top_five,
      imagen: result.secure_url, // URL segura de la imagen en Cloudinary
    });

    // Guarda el nuevo producto en la base de datos
    await newProduct.save();

    // Elimina el archivo local después de subirlo a Cloudinary
    fs.unlinkSync(req.file.path); // Eliminar el archivo loc

    // Responde con éxito
    res.status(200).json({
      success: true,
      message: "Producto agregado exitosamente",
      //product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//funcion para listar productos
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// funcion para remover productos
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Producto Eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// funcion para extraer un solo producto
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addProduct, listProduct, removeProduct, singleProduct };
