const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  const contacts = await Contact.find();
  console.log(contacts);
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
  const body = req.body;
  const newContact = await Contact.create(body);
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
