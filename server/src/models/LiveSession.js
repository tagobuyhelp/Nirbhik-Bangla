const mongoose = require('mongoose');

const LiveSessionSchema = new mongoose.Schema({
  title: {
    bn: { type: String, required: true },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  slug: { type: String, required: true, unique: true },
  description: {
    bn: { type: String, default: '' },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  category: { type: String, default: 'News' },
  reporter: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  tags: [{ type: String }],
  
  sourceType: {
    type: String,
    enum: ['youtube', 'facebook', 'restream', 'rtmp', 'embed'],
    default: 'youtube'
  },
  youtubeVideoId: { type: String, default: '' },
  youtubeUrl: { type: String, default: '' },
  facebookUrl: { type: String, default: '' },
  restreamStreamId: { type: String, default: '' },
  rtmpUrl: { type: String, default: '' },
  embedUrl: { type: String, default: '' },
  streamKey: { type: String, default: '' },

  status: {
    type: String,
    enum: ['draft', 'scheduled', 'starting', 'live', 'paused', 'reconnecting', 'ended', 'archived'],
    default: 'draft'
  },

  startedAt: { type: Date },
  endedAt: { type: Date },
  scheduledAt: { type: Date },
  duration: { type: String, default: '' },
  viewerCount: { type: Number, default: 0 },
  peakViewer: { type: Number, default: 0 },

  isBreaking: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  allowReplay: { type: Boolean, default: true },
  notifySubscribers: { type: Boolean, default: true },
  chatEnabled: { type: Boolean, default: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true
});

LiveSessionSchema.index({ status: 1 });
LiveSessionSchema.index({ 'title.bn': 'text', 'title.en': 'text' });
LiveSessionSchema.index({ slug: 1 });

module.exports = mongoose.model('LiveSession', LiveSessionSchema);
