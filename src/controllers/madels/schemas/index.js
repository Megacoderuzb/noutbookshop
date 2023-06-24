const Joi = require("joi");

exports.patchMadelSchema = Joi.object({
  name: Joi.string().required(),
});
exports.postMadelSchema = Joi.object({
  name: Joi.string().required(),
});
