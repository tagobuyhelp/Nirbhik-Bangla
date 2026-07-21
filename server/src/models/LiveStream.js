const mongoose = require('mongoose');

const LiveStreamSchema = new mongoose.Schema({
  title: {
    bn: { type: String, required: true },
    hi: { type: String, default: '' },
    en: { type: String, required: true }
  },
  streamType: {
    type: String,
    enum: ['youtube', 'facebook', 'rtmp', 'hls', 'm3u8', 'iframe'],
    default: 'youtube'
  },
  streamUrl: { type: String, required: true },
  embedCode: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  isLive: { type: Boolean, default: false, index: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('LiveStream', LiveStreamSchema);
