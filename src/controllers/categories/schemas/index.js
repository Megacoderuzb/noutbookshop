const Joi = require("joi");

exports.patchCategoriesSchema = Joi.object({
  category_name: Joi.string().required(),
});
exports.postCategoriesSchema = Joi.object({
  category_name: Joi.string().required(),
});
