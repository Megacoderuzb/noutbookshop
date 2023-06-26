const Joi = require("joi");

const postNotebooksSchema = Joi.object({
  name: Joi.string().required(),
  brand_id: Joi.number().required(),
  madels_id: Joi.number().required(),
  category_id: Joi.number().required(),
  image_id: Joi.number(),
  description: Joi.string().required(),
  price: Joi.number().integer().positive().required(),
  created_at: Joi.date().timestamp(),
});
const patchNotebooksSchema = Joi.object({
  name: Joi.string(),
  brand_id: Joi.number(),
  madels_id: Joi.number(),
  category_id: Joi.number(),
  image_id: Joi.number(),
  description: Joi.string(),
  price: Joi.number().integer().positive(),
  created_at: Joi.date().timestamp(),
});
module.exports = {
  postNotebooksSchema,
  patchNotebooksSchema,
};
