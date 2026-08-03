const mongoose = require('mongoose');

const PushSubscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  },
  userAgent: { type: String, default: '' },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'failed'],
    default: 'active'
  },
  failCount: { type: Number, default: 0 },
  lastSentAt: { type: Date }
}, {
  timestamps: true
});

PushSubscriptionSchema.index({ endpoint: 1 });
PushSubscriptionSchema.index({ status: 1 });

module.exports = mongoose.model('PushSubscription', PushSubscriptionSchema);
