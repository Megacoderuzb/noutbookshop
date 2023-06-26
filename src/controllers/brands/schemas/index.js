const Joi = require("joi");

patchBrandsSchema = Joi.object({
  brand_name: Joi.string().required(),
});
postBrandsSchema = Joi.object({
  brand_name: Joi.string().required(),
});

module.exports = {
  patchBrandsSchema,
  postBrandsSchema,
};
