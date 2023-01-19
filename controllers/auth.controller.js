const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const { HttpError } = require("../helpers");

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  //   const savedUser = await User.create({ email, password });
  try {
    const savedUser = await User.create({ email, password: hashedPassword });
    res.status(201).json({ data: { user: email, id: savedUser._id } });
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
    throw new HttpError(401, "email is not valid");
  }

  const isPasswordValid = await bcrypt.compare(password, checkUser.password);
  if (!isPasswordValid) {
    throw new HttpError(401, "password is not valid");
  }
  res.json({
    data: {
      token: "<TOKEN>",
    },
  });
}

module.exports = { register, login };
