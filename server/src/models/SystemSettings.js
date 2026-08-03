const mongoose = require('mongoose');

const SystemSettingsSchema = new mongoose.Schema({
  streaming: {
    defaultPlatform: { type: String, enum: ['youtube', 'facebook', 'restream', 'rtmp'], default: 'youtube' },
    youtubeConnected: { type: Boolean, default: false },
    facebookConnected: { type: Boolean, default: false },
    restreamConnected: { type: Boolean, default: false },
    autoDetectLive: { type: Boolean, default: false },
    autoStop: { type: Boolean, default: true },
    youtubeApiKey: { type: String, default: '' }
  },
  email: {
    provider: { type: String, default: 'smtp' },
    senderName: { type: String, default: 'Nirbhik Bangla' },
    senderEmail: { type: String, default: 'noreply@nirbhikbangla.com' }
  },
  seo: {
    siteName: { type: String, default: 'Nirbhik Bangla' },
    metaDescription: { type: String, default: 'Latest Bengali News' }
  },
  ads: {
    googleAdsenseEnabled: { type: Boolean, default: false }
  },
  storage: {
    provider: { type: String, enum: ['local', 's3', 'gcs'], default: 'local' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SystemSettings', SystemSettingsSchema);
