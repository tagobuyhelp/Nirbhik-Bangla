const mongoose = require('mongoose');

const ArticleVersionSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true, index: true },
  versionNumber: { type: Number, required: true },
  title: {
    bn: String,
    hi: String,
    en: String
  },
  content: {
    bn: String,
    hi: String,
    en: String
  },
  excerpt: {
    bn: String,
    hi: String,
    en: String
  },
  editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  changeNote: { type: String, default: 'Autosave / Revision update' }
}, { timestamps: true });

ArticleVersionSchema.index({ articleId: 1, versionNumber: -1 });

module.exports = mongoose.model('ArticleVersion', ArticleVersionSchema);
