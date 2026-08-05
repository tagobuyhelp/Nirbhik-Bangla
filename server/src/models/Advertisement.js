const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  adType: { type: String, default: 'Image' },
  locationSlot: { type: String, required: true, index: true },
  adCategory: { type: String, default: '' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  
  imageUrl: { type: String, default: '' },
  targetUrl: { type: String, default: '' },
  scriptCode: { type: String, default: '' },
  
  altText: { type: String, default: '' },
  description: { type: String, default: '' },
  ctaButton: { type: String, default: 'Learn More' },
  customCta: { type: String, default: '' },
  
  devices: {
    desktop: { type: Boolean, default: true },
    mobile: { type: Boolean, default: true },
    tablet: { type: Boolean, default: true }
  },
  
  frequencyCap: { type: Boolean, default: true },
  timezone: { type: String, default: '' },
  
  impressionsCount: { type: Number, default: 0 },
  clicksCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true, index: true },
  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
