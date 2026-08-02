const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  streamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LiveStream',
    required: false // Can be null if it's a global poll
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    color: { type: String, default: 'purple' } // for UI mapping
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Poll', PollSchema);
