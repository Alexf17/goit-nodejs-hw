const express = require("express");
const {
  createContact,
  getContacts,
  currentUser,
} = require("../controllers/user.controllers");
const { tryCatchWrapper } = require("../helpers/index");
const { auth } = require("../middlewares/index");

const userRouter = express.Router();

userRouter.get(
  "/contacts",
  tryCatchWrapper(auth),
  tryCatchWrapper(getContacts)
);
userRouter.post(
  "/contacts",
  tryCatchWrapper(auth),
  tryCatchWrapper(createContact)
);
userRouter.get(
  "/currentUser",
  tryCatchWrapper(auth),
  tryCatchWrapper(currentUser)
);

module.exports = { userRouter };
