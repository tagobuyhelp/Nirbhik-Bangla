const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    bn: { type: String, required: true },
    hi: { type: String, default: '' },
    en: { type: String, required: true }
  },
  slug: { type: String, required: true, unique: true, index: true },
  description: {
    bn: { type: String, default: '' },
    hi: { type: String, default: '' },
    en: { type: String, default: '' }
  },
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: [{ type: String }]
  },
  usageCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Tag', TagSchema);
