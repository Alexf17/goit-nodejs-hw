const { HttpError } = require("../helpers/httpError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const multer = require("multer");
const path = require("path");

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
    throw new HttpError(401, "No token provided");
  }
  if (type !== "Bearer") {
    throw new HttpError(401, "Token type is not valid");
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
      throw new HttpError(401, "JWT token is not valid");
    }
    throw error;
  }
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limits: { filSize: 2000 },
});

const upload = multer({ storage });

module.exports = {
  validationData,
  auth,
  upload,
};
