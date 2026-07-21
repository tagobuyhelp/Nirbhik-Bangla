const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    bn: { type: String, required: true },
    hi: { type: String, default: '' },
    en: { type: String, required: true }
  },
  slug: { type: String, required: true, unique: true, index: true },
  usageCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Tag', TagSchema);
