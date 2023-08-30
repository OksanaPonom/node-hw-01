const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// Повертає масив контактів.
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
};
// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};
//  Повертає об'єкт доданого контакту.
const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
