const mongoose = require('mongoose');

const WidgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  widgetType: {
    type: String,
    enum: ['hero_slider', 'breaking_ticker', 'category_grid', 'live_tv_strip', 'video_gallery', 'trending_list', 'ad_banner', 'poll_box', 'weather_widget'],
    required: true
  },
  order: { type: Number, required: true, default: 0 },
  isVisible: { type: Boolean, default: true },
  settings: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Widget', WidgetSchema);
