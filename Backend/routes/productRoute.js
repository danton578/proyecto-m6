const express = require("express");
const {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} = require("../controllers/productController");
const upload = require("../middlewares/multer");
const adminAuth = require("../middlewares/adminAuth");

const productRouter = express.Router();
// tengo que ver si aplico multer por el tema de las imagenes
productRouter.post("/add", adminAuth, upload.single("imagen"), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);

module.exports = productRouter;
