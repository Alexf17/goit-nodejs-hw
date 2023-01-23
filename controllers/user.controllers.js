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
  const { email, subscription } = user;

  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  return res.status(200).json({
    data: {
      user: {
        subscription,
        email,
      },
    },
  });
}

module.exports = { createContact, getContacts, currentUser };
