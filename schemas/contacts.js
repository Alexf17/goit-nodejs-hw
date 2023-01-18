const Joi = require("joi");

const addContactValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(9).required(),
  favorite: Joi.boolean(),
});

const updateContactValidation = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(9),
  favorite: Joi.boolean(),
});

const updateFavoriteStatus = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateFavoriteStatus,
};
