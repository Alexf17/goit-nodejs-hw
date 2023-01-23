const { Contact } = require("../models/contact");

async function getContacts(req, res, next) {
  const { limit = 10, page = 1, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const favoriteContacts = await Contact.find({ favorite: true });
    return res.status(200).json(favoriteContacts);
  }

  const contacts = await Contact.find().skip(skip).limit(limit);
  // console.log(contacts);
  return res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  console.log(contact);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;
  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });
  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;

  const updateContacts = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updateContacts) {
    return res.status(400).json({
      message: `Contact id ${contactId} does not exist in the database`,
    });
  }
  return res.status(200).json(updateContacts);
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;

  const updatedStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    body,
    {
      new: true,
    }
  );
  if (!updatedStatusContact) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  return res.status(200).json(updatedStatusContact);
}

module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
