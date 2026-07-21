const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, index: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  group: {
    type: String,
    enum: ['general', 'seo', 'appearance', 'ai', 'media', 'smtp', 'social', 'adsense', 'security'],
    default: 'general',
    index: true
  },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
