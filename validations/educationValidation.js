const Joi = require("joi");

const educationSchema = Joi.object({
  degree: Joi.string().required(),
  institute: Joi.string().required(),
  startYear: Joi.number().integer().required(),
  endYear: Joi.number().integer().required(),
  grade: Joi.string().optional(),
  fieldOfStudy: Joi.string().optional()
});

module.exports = educationSchema;
