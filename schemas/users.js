const Joi = require("joi");

const newUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6),
  subscription: Joi.string(),
});

const userMailValidation = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  newUserSchema,
  userMailValidation,
};
