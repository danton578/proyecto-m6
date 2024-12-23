const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "No autorizado loguear denuevo",
      });
    }
    const token_decode = jwt.verify(token.process.env.JWT_SECRET);

    console.log(token_decode);
    console.log(process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "No autorizado loguear denuevo",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = adminAuth;
