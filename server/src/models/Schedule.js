const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  title: {
    bn: { type: String, required: true },
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  host: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, default: 'News' },
  startTime: { type: String, required: true }, // e.g. "07:00 AM" or ISO
  endTime: { type: String, default: '' },     // e.g. "08:00 AM"
  startDate: { type: Date, required: true, default: Date.now },
  duration: { type: String, default: '01:00:00' },
  status: {
    type: String,
    enum: ['Live Now', 'Upcoming', 'Completed', 'Cancelled'],
    default: 'Upcoming'
  },
  coHost: { type: String, default: '' },
  tags: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: true },
  isAgeRestricted: { type: Boolean, default: false },
  repeatOption: { type: String, default: 'Does not repeat' },
  location: { type: String, default: '' },
  notes: { type: String, default: '' },
  platforms: {
    type: [String],
    default: ['web', 'yt', 'fb']
  },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
