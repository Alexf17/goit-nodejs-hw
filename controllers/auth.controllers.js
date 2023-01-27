const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { HttpError } = require("../helpers/httpError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  //   const savedUser = await User.create({ email, password });
  try {
    const avatarURL = gravatar.url(email);
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });
    res
      .status(201)
      .json({ data: { user: email, id: savedUser._id, avatarURL } });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      throw new HttpError(409, "Email in use");
    }
    throw error;
  }

  //   res.status(201).json({ data:{user: savedUser} });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, checkUser.password);
  if (!isPasswordValid) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: checkUser._id }, JWT_SECRET, {
    expiresIn: "10h",
  });
  return res.json({
    data: {
      token,
      user: { email },
    },
  });
}

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: null });
    if (!user) {
      throw new HttpError(401, "Not authorized");
    }
    return res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = { register, login, logout };
