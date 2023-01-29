const express = require("express");
const {
  createContact,
  getContacts,
  currentUser,
} = require("../controllers/user.controllers");
const { updateAvatar } = require("../controllers/updateAvatar");
const { tryCatchWrapper } = require("../helpers/index");
const { auth, upload } = require("../middlewares/index");

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
userRouter.patch(
  "/avatars",
  tryCatchWrapper(auth),
  upload.single("avatar"),
  tryCatchWrapper(updateAvatar)
);

module.exports = { userRouter };
