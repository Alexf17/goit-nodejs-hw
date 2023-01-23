const express = require("express");
const router = express.Router();

const {
  getContact,
  getContacts,
  updateContact,
  deleteContact,
  createContact,
  updateStatusContact,
} = require("../controllers/contacts.controllers");

const { validationData, auth } = require("../middlewares/index");
const { tryCatchWrapper } = require("../helpers/index");
const {
  addContactValidation,
  updateContactValidation,
  updateFavoriteStatus,
} = require("../schemas/contacts");

router.get("/", tryCatchWrapper(auth), tryCatchWrapper(getContacts));
// router.get("/", getContacts);

router.get("/:contactId", tryCatchWrapper(auth), tryCatchWrapper(getContact));

router.post(
  "/",
  tryCatchWrapper(auth),
  validationData(addContactValidation),
  tryCatchWrapper(createContact)
);

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  tryCatchWrapper(auth),
  validationData(updateContactValidation),
  tryCatchWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  tryCatchWrapper(auth),
  validationData(updateFavoriteStatus),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
