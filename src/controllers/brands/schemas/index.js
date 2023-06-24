const Joi = require("joi");

exports.patchBrandsSchema = Joi.object({
  name: Joi.string().required(),
});
exports.postBrandsSchema = Joi.object({
  name: Joi.string().required(),
});
