const express = require("express");

const { register } = require("../controllers/auth.controllers");
const { login, logout } = require("../controllers/auth.controllers");
const { tryCatchWrapper } = require("../helpers/index");
const { auth, validationData } = require("../middlewares/index");
const { newUserSchema } = require("../schemas/users");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validationData(newUserSchema),
  tryCatchWrapper(register)
);
authRouter.post(
  "/login",
  validationData(newUserSchema),
  tryCatchWrapper(login)
);
authRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));

module.exports = {
  authRouter,
};
