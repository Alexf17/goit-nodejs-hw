const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactById, null, 2));
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const id = nanoid();
  const { name, phone, email } = body;
  const contact = { id, name, email, phone };
  try {
    const contacts = await listContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    contacts[contactIndex] = { ...contact, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
