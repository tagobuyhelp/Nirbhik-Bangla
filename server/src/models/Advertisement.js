const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  adType: {
    type: String,
    enum: ['google_adsense', 'banner', 'video', 'native', 'sponsored', 'interstitial', 'sticky', 'popup', 'anchor'],
    default: 'banner'
  },
  locationSlot: {
    type: String,
    enum: ['header_top', 'sidebar_top', 'sidebar_bottom', 'article_inline', 'article_bottom', 'footer_sticky', 'popup_modal'],
    required: true,
    index: true
  },
  imageUrl: { type: String, default: '' },
  targetUrl: { type: String, default: '' },
  scriptCode: { type: String, default: '' }, // For Google AdSense or HTML tags
  impressionsCount: { type: Number, default: 0 },
  clicksCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true, index: true },
  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
