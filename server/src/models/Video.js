const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: {
    bn: { type: String, required: true },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  subtitle: {
    bn: { type: String, default: '' },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  description: {
    bn: { type: String, default: '' },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  sourceType: {
    type: String,
    enum: ['upload', 'yt_single', 'yt_playlist', 'yt_live', 'fb', 'url'],
    default: 'yt_single'
  },
  videoUrl: { type: String, default: '' },
  youtubeId: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  category: { type: String, default: 'Politics', index: true },
  playlist: { type: String, default: '' },
  tags: [{ type: String }],
  duration: { type: String, default: '00:00' },
  resolution: { type: String, default: '1080p' },
  fileSize: { type: String, default: '' },
  views: { type: Number, default: 0 },
  viewsTrend: { type: String, default: '+0%' },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Scheduled', 'Processing', 'Private', 'LIVE'],
    default: 'Published',
    index: true
  },
  isLive: { type: Boolean, default: false, index: true },
  visibility: { type: String, default: 'Public' },
  ageRestriction: { type: String, default: "No, it's not made for kids" },
  commentsPolicy: { type: String, default: 'Allow all comments' },
  embeddable: { type: Boolean, default: true },
  slug: { type: String, unique: true, sparse: true, index: true },
  seoTitle: {
    bn: { type: String, default: '' },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  seoDescription: {
    bn: { type: String, default: '' },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  altText: {
    bn: { type: String, default: '' },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  keywords: [{ type: String }],
  isFeatured: { type: Boolean, default: false, index: true },
  sendNotification: { type: Boolean, default: false }
}, { timestamps: true });

// Helper to extract YouTube Video ID from URL
VideoSchema.statics.extractYoutubeId = function(url) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

module.exports = mongoose.model('Video', VideoSchema);
