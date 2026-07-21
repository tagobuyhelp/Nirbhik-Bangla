const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    bn: { type: String, required: true },
    hi: { type: String, default: '' },
    en: { type: String, required: true }
  },
  slug: { type: String, required: true, unique: true, index: true },
  description: {
    bn: String,
    hi: String,
    en: String
  },
  icon: { type: String, default: '' },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
