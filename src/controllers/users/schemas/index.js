const Joi = require("joi");

const loginUsersSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(4),
});
const patchUsersSchema = Joi.object({
  full_name: Joi.string(),
  username: Joi.string(),
  role: Joi.string().valid("admin"),
  password: Joi.string().min(4),
});
const postUsersSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  role: Joi.string().valid("admin").required(),
  password: Joi.string().required().min(4),
});
module.exports = {
  postUsersSchema,
  loginUsersSchema,
  patchUsersSchema,
};
