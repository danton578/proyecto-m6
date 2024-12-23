const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
    categoria: { type: String, required: true },
    subcategoria: { type: String, required: true },
    top_five: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

module.exports = productModel;
