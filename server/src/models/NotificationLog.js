const mongoose = require('mongoose');

const NotificationLogSchema = new mongoose.Schema({
  title: {
    bn: { type: String, required: true },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  body: {
    bn: { type: String, default: '' },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  icon: { type: String, default: '/favicon.ico' },
  image: { type: String, default: '' },
  url: { type: String, default: '/' },
  target: {
    type: String,
    enum: ['all', 'breaking', 'live', 'category'],
    default: 'all'
  },
  totalTargeted: { type: Number, default: 0 },
  totalDelivered: { type: Number, default: 0 },
  totalClicked: { type: Number, default: 0 },
  sentAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('NotificationLog', NotificationLogSchema);
