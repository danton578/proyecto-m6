const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/mongodb.js");
const connectCloudinary = require("./config/cloudinary.js");
const userRouter = require("./routes/userRoute.js");
const productRouter = require("./routes/productRoute.js");

console.log(process.env);
//App config
const app = express();
const port = process.env.PORT || 3500;
connectDB();
connectCloudinary();

//midlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("Api Trabajando");
});

app.listen(port, () => console.log("Server started on PORT: " + port));
