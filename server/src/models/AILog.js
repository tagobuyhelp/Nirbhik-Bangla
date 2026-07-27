const mongoose = require('mongoose');

const AILogSchema = new mongoose.Schema({
  service: { type: String, required: true },
  promptName: { type: String, required: true },
  model: { type: String, default: 'gemini-2.5-flash' },
  usage: {
    promptTokens: { type: Number, default: 0 },
    completionTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 }
  },
  executionTimeMs: { type: Number, default: 0 },
  status: { type: String, enum: ['SUCCESS', 'ERROR', 'CACHED', 'RATE_LIMITED'], default: 'SUCCESS' },
  errorMessage: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetId: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

module.exports = mongoose.model('AILog', AILogSchema);
