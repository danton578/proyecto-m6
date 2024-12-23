const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//Crea el token de acceso
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route para login usuario
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "usuario no existe" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Credenciales invalidas" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route para registro de usuario
const registerUser = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    //chequea si usuario existe

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Usuario ya existe" });
    }

    // valida si formato email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Ingrese un email valido" });
    }
    // valida que el password sea mayor a 8
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "debe ingresar un password de 8 caracteres",
      });
    }

    // encripta el password de usuario
    const salt = await bcrypt.genSalt(10); // salar el hash
    const hashedPassword = await bcrypt.hash(password, salt); // aplica sala y encripta el password

    // constante que almacena el nuevo usuario en el modelo userModel

    const newUser = new userModel({
      nombre,
      email,
      password: hashedPassword,
    });

    // guarda el usuario en la base
    const user = await newUser.save();

    // crea el token para el id del usuario creado en la base de datos
    const token = createToken(user._id);

    // entrega una respuesta de acceso junto con el token
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route para administrador login usuario
const admiLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Credenciales invalidas" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { loginUser, registerUser, admiLogin };
