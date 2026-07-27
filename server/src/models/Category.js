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
  color: { type: String, default: '#eb1c24' },
  featuredImage: { type: String, default: '' },
  seo: {
    title: { type: String, default: '' },
    metaDesc: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' },
    ogTitle: { type: String, default: '' },
    ogDesc: { type: String, default: '' }
  },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  focusKeywords: [{ type: String }],
  relatedCategories: [{ type: String }],
  searchKeywords: [{ type: String }],
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
