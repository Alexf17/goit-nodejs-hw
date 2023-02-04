const { sendMail } = require("../helpers");
const { HttpError } = require("../helpers/httpError");
const { User } = require("../models/user");

async function createContact(req, res, next) {
  const { user } = req;
  const { id } = req.body;
  user.contacts.push(id);
  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({ data: { contacts: user.contacts } });
}

async function getContacts(req, res, next) {
  const { user } = req;
  // const { contacts } = user;

  const userWithContacts = await User.findById(user._id).populate("contacts", {
    name: 1,
    phone: 1,
  });
  return res
    .status(200)
    .json({ data: { contacts: userWithContacts.contacts } });
}

async function currentUser(req, res, next) {
  const { user } = req;
  const { email, subscription, avatarURL } = user;

  if (!user) {
    throw new HttpError(401, "Not authorized");
  }
  return res.status(200).json({
    data: {
      user: {
        subscription,
        email,
        avatarURL,
      },
    },
  });
}

async function verifyEmail(req, res, next) {
  const { verificationToken } = await req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: " ",
  });
  return res.status(200).json({ message: "Verification successful" });
}

async function reVerifyEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    throw new HttpError(400, "missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (user.verify) {
    throw new HttpError(404, "Verification has already been passed");
  }
  await sendMail({
    to: email,
    subject: "Your email is still not verified. Confirm your email",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
  });

  return res.status(200).json({ message: "Verification email sent" });
}

module.exports = {
  createContact,
  getContacts,
  currentUser,
  verifyEmail,
  reVerifyEmail,
};
