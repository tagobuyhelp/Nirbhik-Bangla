const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    articleSlug: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    comment: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
