const db = require("../models/contacts");

async function getContacts(req, res, next) {
  const contacts = await db.listContacts();
  console.log(contacts);
  return res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  console.log(contact);
  if (!contact) {
    return next(res.status(404).json({ message: "Not found" }));
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await db.addContact(name, email, phone);
  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  await db.removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;
  const updateContacts = await db.updateContact(contactId, body);
  if (!body) {
    return res.status(400).json({ message: "missing fields" });
  }
  return res.status(200).json(updateContacts);
}

module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
};
