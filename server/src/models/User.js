const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES, ALL_ROLES } = require('../constants/roles');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, trim: true },
  role: { type: String, enum: ALL_ROLES, default: ROLES.REPORTER },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isTwoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String, select: false },
  lastLoginAt: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },

  // Reporter-specific fields (populated for reporter-role users)
  designation: {
    type: String,
    enum: ['Staff Reporter', 'Senior Reporter', 'District Correspondent', 'Chief Reporter', 'Photo Journalist', 'Video Journalist'],
    default: 'Staff Reporter'
  },
  specialization: {
    type: String,
    enum: ['Politics', 'Crime', 'Education', 'Health', 'Sports', 'Business', 'Environment', 'Culture', 'Technology', 'International', 'National'],
    default: 'National'
  },
  location: { type: String, default: 'Dhaka, Bangladesh', trim: true },
  reporterStatus: {
    type: String,
    enum: ['Active', 'On Assignment', 'Inactive'],
    default: 'Active'
  },
  skills: [{ type: String, trim: true }],
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    youtube: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  dateOfJoin: { type: Date },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  employeeId: { type: String, trim: true }
}, { timestamps: true });

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
