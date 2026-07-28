const mongoose = require('mongoose');
const { WORKFLOW_STATES } = require('../constants/workflow');

const TranslationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, index: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  tags: [{ type: String }],
  imageMetadata: {
    altText: { type: String, default: '' },
    caption: { type: String, default: '' },
    credit: { type: String, default: '' },
  },
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: [{ type: String }],
  },
  status: {
    type: String,
    enum: [...Object.values(WORKFLOW_STATES), 'manual_review'],
    default: WORKFLOW_STATES.PUBLISHED,
  },
  aiGenerated: { type: Boolean, default: false },
  manualEdited: { type: Boolean, default: false },
  translationVersion: { type: Number, default: 1 },
  confidence: { type: Number, default: 100 },
  translatedAt: { type: Date, default: Date.now },
  publishedAt: { type: Date, default: Date.now },
}, { _id: false });

const ArticleSchema = new mongoose.Schema({
  defaultLanguage: { type: String, default: 'bn', required: true },
  originalLanguage: { type: String, default: 'bn', required: true },
  
  // Flexible map of ISO language code -> Translation Object (bn, en, hi, etc.)
  translations: {
    type: Map,
    of: TranslationSchema,
    required: true,
  },

  featuredImageUrl: { type: String, default: '' },
  galleryUrls: [{ type: String }],
  videoUrl: { type: String, default: '' },
  isVideo: { type: Boolean, default: false, index: true },

  categorySlug: { type: String, required: true, index: true },
  categoryName: { type: String, default: 'সাধারণ' },
  tags: [{ type: String }],
  
  authorName: { type: String, default: 'নির্ভীক বাংলা সংবাদ প্রতিনিধি' },
  
  isBreaking: { type: Boolean, default: false, index: true },
  isTrending: { type: Boolean, default: false, index: true },
  isFeatured: { type: Boolean, default: false, index: true },
  viewsCount: { type: Number, default: 0, index: true },
  
  allowComments: { type: Boolean, default: true },
  showOnHomepage: { type: Boolean, default: true },
  socialCaptions: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    telegram: { type: String, default: '' }
  },
  aiSummary: { type: String, default: '' },
  imageMetadata: {
    altText: { type: String, default: '' },
    caption: { type: String, default: '' },
    credit: { type: String, default: '' }
  },
  stats: {
    wordCount: { type: Number, default: 0 },
    charCount: { type: Number, default: 0 },
    readingTime: { type: Number, default: 1 }
  },

  translationStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'manual_review'],
    default: 'completed',
    index: true,
  },

  publishedAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true });

ArticleSchema.index({ 'translations.$**.title': 'text', 'translations.$**.content': 'text' });

module.exports = mongoose.model('Article', ArticleSchema);
