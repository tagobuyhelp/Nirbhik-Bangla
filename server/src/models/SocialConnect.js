const mongoose = require('mongoose');

const socialConnectSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['facebook', 'telegram', 'youtube', 'twitter', 'whatsapp', 'instagram'],
    unique: true
  },
  name: { type: String, required: true },
  handle: { type: String, default: '' },
  badge: { type: String, default: 'ACTIVE' },
  followerCount: { type: String, default: '0' },
  isConnected: { type: Boolean, default: false },
  autoPost: { type: Boolean, default: false },
  appId: { type: String, default: '' },
  appSecret: { type: String, default: '' },
  accessToken: { type: String, default: '' },
  botToken: { type: String, default: '' },
  chatId: { type: String, default: '' },
  webhookUrl: { type: String, default: '' },
  lastSync: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('SocialConnect', socialConnectSchema);
