const mongoose = require('mongoose');

const AdPlacementSchema = new mongoose.Schema({
  placementName: { type: String, required: true },
  placementType: { type: String, default: 'Banner' },
  location: { type: String, required: true },
  adSize: { type: String, default: '970x90' },
  adFormat: { type: String, default: 'Image' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true, index: true },
  
  devices: {
    desktop: { type: Boolean, default: true },
    mobile: { type: Boolean, default: true },
    tablet: { type: Boolean, default: false }
  },
  
  adFrequency: { type: String, default: 'every_page' },
  limitPages: { type: Number, default: 0 },
  adRotation: { type: String, default: 'optimize' },
  
  targeting: { type: String, default: '' },
  includePages: { type: String, default: '' },
  excludePages: { type: String, default: '' },
  
  startDate: { type: Date },
  endDate: { type: Date },
  
  impressionsCount: { type: Number, default: 0 },
  clicksCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('AdPlacement', AdPlacementSchema);
