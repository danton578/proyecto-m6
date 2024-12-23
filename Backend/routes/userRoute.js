const express = require("express");
const {
  loginUser,
  registerUser,
  admiLogin,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", admiLogin);

module.exports = userRouter;
