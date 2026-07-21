const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  type: { type: String, enum: ['image', 'video', 'audio', 'document'], default: 'image' },
  mime: { type: String, required: true },
  size: { type: Number, required: true }, // in bytes
  width: { type: Number },
  height: { type: Number },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  copyright: { type: String, default: '' },
  photographer: { type: String, default: '' },
  location: { type: String, default: '' },
  cloudinary_id: { type: String },
  url: { type: String, required: true },
  thumbnailUrl: { type: String },
  mediumUrl: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Media', MediaSchema);
