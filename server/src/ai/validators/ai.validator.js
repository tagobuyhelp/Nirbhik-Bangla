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
      }),
      factcheck: Joi.object({
        score: Joi.number().min(0).max(100).required(),
        flaggedClaims: Joi.array().items(Joi.string()).default([]),
        verdict: Joi.string().required()
      }),
      editor: Joi.object({
        editedText: Joi.string().required()
      }),
      imagealt: Joi.object({
        altText: Joi.string().allow(''),
        caption: Joi.string().allow(''),
        credit: Joi.string().allow('')
      })
    };
  }

  validate(type, data) {
    if (!data) return null;
    const schema = this.schemas[type];
    if (!schema) {
      console.warn(`No validation schema found for AI output type: ${type}`);
      return data;
    }
    const { error, value } = schema.validate(data, { stripUnknown: true });
    if (error) {
      console.warn(`AI Validator warning for type ${type}:`, error.message);
      if (type === 'translation') {
        const strVal = typeof data === 'string' ? data : (data.translation || data.translatedText || data.text || Object.values(data)[0]);
        if (typeof strVal === 'string') return { translation: strVal };
      }
    }
    return value || data;
  }
}

module.exports = new AIValidator();
