const { HttpError } = require("../helpers/httpError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

function validationData(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  // console.log("authHeader", authHeader);
  const [type, token] = authHeader.split(" ");
  // console.log("type", type);
  if (!token) {
    throw HttpError(401, "No token provided");
  }
  if (type !== "Bearer") {
    throw HttpError(401, "Token type is not valid");
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    // console.log("user", user);
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw HttpError(401, "JWT token is not valid");
    }
    throw error;
  }
  next();
}

module.exports = {
  validationData,
  auth,
};
