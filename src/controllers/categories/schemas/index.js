const Joi = require("joi");

exports.patchCategoriesSchema = Joi.object({
  name: Joi.string().required(),
});
exports.postCategoriesSchema = Joi.object({
  name: Joi.string().required(),
});
