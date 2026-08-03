const mongoose = require('mongoose');

const LiveChatSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'LiveSession', required: true },
  message: { type: String, required: true },
  sender: {
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
  },
  type: {
    type: String,
    enum: ['user', 'system', 'superchat', 'admin'],
    default: 'user'
  },
  moderated: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false }
}, {
  timestamps: true
});

LiveChatSchema.index({ sessionId: 1, createdAt: 1 });

module.exports = mongoose.model('LiveChat', LiveChatSchema);
