const Joi = require('joi');

/**
 *
 * @param {Joi.Schema} schema
 * @returns
 */
module.exports = function genValidator(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: error.details[0].message,
      });
    }
  };
};
