const { User } = require("../models/users");
const { HttpError } = require("./helpers");

async function register(req, res, next) {
  const { email, password } = req.body;
  //   const savedUser = await User.create({ email, password });
  try {
    const savedUser = await User.create({ email, password });
    res.status(201).json({ data: { user: savedUser } });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      throw new HttpError(409, "Email in use");
    }
    throw error;
  }

  //   res.status(201).json({ data:{user: savedUser} });
}

module.exports = { register };
