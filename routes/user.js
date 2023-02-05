const express = require("express");
const {
  createContact,
  getContacts,
  currentUser,
  verifyEmail,
  reVerifyEmail,
} = require("../controllers/user.controllers");
const { updateAvatar } = require("../controllers/updateAvatar");
const { tryCatchWrapper } = require("../helpers/index");
const { auth, upload, validationData } = require("../middlewares/index");
const { userMailValidation } = require("../schemas/users");

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
userRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));

userRouter.post(
  "/verify",
  validationData(userMailValidation),
  tryCatchWrapper(reVerifyEmail)
);

module.exports = { userRouter };
