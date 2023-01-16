const express = require("express");
const router = express.Router();

const {
  getContact,
  getContacts,
  updateContact,
  deleteContact,
  createContact,
  updateStatusContact,
} = require("../../controllers/contacts.controllers");

const { validationData, tryCatchWrapper } = require("../../middlewares/index");

const {
  addContactValidation,
  updateContactValidation,
  updateFavoriteStatus,
} = require("../../schemas/contacts");

router.get("/", tryCatchWrapper(getContacts));
// router.get("/", getContacts);

router.get("/:contactId", tryCatchWrapper(getContact));

router.post(
  "/",
  validationData(addContactValidation),
  tryCatchWrapper(createContact)
);

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validationData(updateContactValidation),
  tryCatchWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  validationData(updateFavoriteStatus),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
