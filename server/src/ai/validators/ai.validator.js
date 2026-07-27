const Joi = require('joi');

class AIValidator {
  constructor() {
    this.schemas = {
      seo: Joi.object({
        title: Joi.string().allow(''),
        description: Joi.string().allow(''),
        keywords: Joi.array().items(Joi.string())
      }),
      headlines: Joi.array().items(Joi.string()).min(1),
      summary: Joi.object({
        summary: Joi.string().required()
      }),
      tags: Joi.object({
        tags: Joi.array().items(Joi.string())
      }),
      social: Joi.object({
        facebook: Joi.string().allow(''),
        twitter: Joi.string().allow(''),
        whatsapp: Joi.string().allow(''),
        telegram: Joi.string().allow('')
      }),
      translation: Joi.object({
        translation: Joi.string().required()
      })
    };
  }

  validate(type, data) {
    const schema = this.schemas[type];
    if (!schema) {
      console.warn(`No validation schema found for AI output type: ${type}`);
      return data;
    }
    const { error, value } = schema.validate(data, { stripUnknown: true });
    if (error) {
      console.error(`AI Validator failed for type ${type}:`, error.message);
      // We don't necessarily throw, we can just return raw data or handle it based on strictness.
      // For now, let's just log and return the data, but in strict mode we could throw.
    }
    return value || data;
  }
}

module.exports = new AIValidator();
