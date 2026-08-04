const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const sendResponse = require('../utils/responseHandler');
const cloudinary = require('../config/cloudinary');

// Ensure avatars uploads dir exists
const avatarsDir = path.join(__dirname, '../../uploads/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const REPORTER_ROLES = ['Reporter', 'Senior Reporter', 'District Correspondent', 'Chief Reporter', 'Photo Journalist', 'Video Journalist'];

// @desc    Get all reporters with pagination, search, filter
// @route   GET /api/v1/reporters
// @access  Private/Admin
exports.getReporters = async (req, res, next) => {
  try {
    const {
      status,
      search,
      specialization,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { role: { $in: REPORTER_ROLES } };

    if (status && status !== 'all') {
      if (status === 'active') query.reporterStatus = 'Active';
      else if (status === 'assignment') query.reporterStatus = 'On Assignment';
      else if (status === 'inactive') query.reporterStatus = 'Inactive';
    }

    if (specialization) query.specialization = specialization;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [reporters, total] = await Promise.all([
      User.find(query)
        .select('-password -twoFactorSecret -resetPasswordToken -resetPasswordExpire')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ]);

    const meta = {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    };

    return sendResponse(res, 200, 'Reporters fetched successfully', reporters, meta);
  } catch (error) {
    next(error);
  }
};

// @desc    Get reporter stats for dashboard cards
// @route   GET /api/v1/reporters/stats
// @access  Private/Admin
exports.getReporterStats = async (req, res, next) => {
  try {
    const [total, active, onAssignment, inactive, topPerformer] = await Promise.all([
      User.countDocuments({ role: { $in: REPORTER_ROLES } }),
      User.countDocuments({ role: { $in: REPORTER_ROLES }, reporterStatus: 'Active' }),
      User.countDocuments({ role: { $in: REPORTER_ROLES }, reporterStatus: 'On Assignment' }),
      User.countDocuments({ role: { $in: REPORTER_ROLES }, reporterStatus: 'Inactive' }),
      User.findOne({ role: { $in: REPORTER_ROLES } })
        .select('name avatar designation specialization')
        .sort({ storyCount: -1, createdAt: -1 })
    ]);

    // Location breakdown
    const locationAgg = await User.aggregate([
      { $match: { role: { $in: REPORTER_ROLES } } },
      {
        $group: {
          _id: {
            $arrayElemAt: [{ $split: ['$location', ','] }, 0]
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const stats = {
      total,
      active,
      onAssignment,
      inactive,
      topPerformer: topPerformer ? {
        name: topPerformer.name,
        designation: topPerformer.designation,
        avatar: topPerformer.avatar
      } : null,
      locationBreakdown: locationAgg.map(l => ({ name: l._id || 'Unknown', count: l.count }))
    };

    return sendResponse(res, 200, 'Reporter stats fetched successfully', stats);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single reporter by ID
// @route   GET /api/v1/reporters/:id
// @access  Private/Admin
exports.getReporter = async (req, res, next) => {
  try {
    const reporter = await User.findOne({
      _id: req.params.id,
      role: { $in: REPORTER_ROLES }
    }).select('-password -twoFactorSecret -resetPasswordToken -resetPasswordExpire');

    if (!reporter) {
      return sendResponse(res, 404, 'Reporter not found');
    }

    return sendResponse(res, 200, 'Reporter fetched successfully', reporter);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new reporter (creates a User with reporter role)
// @route   POST /api/v1/reporters
// @access  Private/Admin
exports.createReporter = async (req, res, next) => {
  try {
    const {
      name, email, password, phone,
      role = 'Reporter', designation, specialization,
      location, bio, avatar, reporterStatus,
      skills, socialLinks, dateOfJoin, dateOfBirth,
      gender, employeeId
    } = req.body;

    if (!name || !email || !password) {
      return sendResponse(res, 400, 'Name, email and password are required');
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return sendResponse(res, 409, 'A user with this email already exists');
    }

    const reporter = await User.create({
      name,
      email,
      password,
      phone,
      role,
      designation,
      specialization,
      location,
      bio,
      avatar,
      reporterStatus: reporterStatus || 'Active',
      skills: skills || [],
      socialLinks: socialLinks || {},
      dateOfJoin: dateOfJoin ? new Date(dateOfJoin) : undefined,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender,
      employeeId
    });

    // Return without password
    const result = reporter.toObject();
    delete result.password;

    return sendResponse(res, 201, 'Reporter created successfully', result);
  } catch (error) {
    next(error);
  }
};

// @desc    Update reporter by ID
// @route   PUT /api/v1/reporters/:id
// @access  Private/Admin
exports.updateReporter = async (req, res, next) => {
  try {
    // Prevent password change via this endpoint
    const { password, ...updateData } = req.body;

    if (updateData.dateOfJoin) updateData.dateOfJoin = new Date(updateData.dateOfJoin);
    if (updateData.dateOfBirth) updateData.dateOfBirth = new Date(updateData.dateOfBirth);

    const reporter = await User.findOneAndUpdate(
      { _id: req.params.id, role: { $in: REPORTER_ROLES } },
      updateData,
      { new: true, runValidators: true }
    ).select('-password -twoFactorSecret -resetPasswordToken -resetPasswordExpire');

    if (!reporter) {
      return sendResponse(res, 404, 'Reporter not found');
    }

    return sendResponse(res, 200, 'Reporter updated successfully', reporter);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete reporter by ID
// @route   DELETE /api/v1/reporters/:id
// @access  Private/Admin
exports.deleteReporter = async (req, res, next) => {
  try {
    const reporter = await User.findOneAndDelete({
      _id: req.params.id,
      role: { $in: REPORTER_ROLES }
    });

    if (!reporter) {
      return sendResponse(res, 404, 'Reporter not found');
    }

    return sendResponse(res, 200, 'Reporter deleted successfully', {});
  } catch (error) {
    next(error);
  }
};

// @desc    Update reporter status only
// @route   PATCH /api/v1/reporters/:id/status
// @access  Private/Admin
exports.updateReporterStatus = async (req, res, next) => {
  try {
    const { reporterStatus } = req.body;
    if (!['Active', 'On Assignment', 'Inactive'].includes(reporterStatus)) {
      return sendResponse(res, 400, 'Invalid status value');
    }

    const reporter = await User.findOneAndUpdate(
      { _id: req.params.id, role: { $in: REPORTER_ROLES } },
      { reporterStatus },
      { new: true }
    ).select('name reporterStatus');

    if (!reporter) {
      return sendResponse(res, 404, 'Reporter not found');
    }

    return sendResponse(res, 200, 'Reporter status updated', reporter);
  } catch (error) {
    next(error);
  }
};

// @desc    Upload avatar for a reporter (or any user)
// @route   POST /api/v1/reporters/upload-avatar
// @access  Private/Admin
// Body: multipart/form-data with field 'avatar' (file) and optionally 'reporterId' (string)
exports.uploadReporterAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendResponse(res, 400, 'No avatar file provided');
    }

    if (!req.file.mimetype.startsWith('image/')) {
      return sendResponse(res, 400, 'Only image files are allowed for avatars');
    }

    const fileBuffer = req.file.buffer;
    let avatarUrl = '';

    // Try Cloudinary upload (square crop, face gravity, webp)
    try {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'nirbhik_bangla/avatars',
            transformation: [
              { width: 400, height: 400, crop: 'fill', gravity: 'face' },
              { quality: 'auto' },
              { fetch_format: 'webp' }
            ],
            format: 'webp'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
      avatarUrl = cloudinaryResult.secure_url;
    } catch (cloudErr) {
      // Fallback: save locally
      console.warn('[AVATAR UPLOAD]: Cloudinary failed, saving locally:', cloudErr.message);
      const ext = '.jpg';
      const filename = `avatar_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
      const filePath = path.join(avatarsDir, filename);
      fs.writeFileSync(filePath, fileBuffer);
      const protocol = req.protocol || 'http';
      const host = req.get('host') || 'localhost:5000';
      avatarUrl = `${protocol}://${host}/uploads/avatars/${filename}`;
    }

    // If reporterId is provided, update the user's avatar in DB immediately
    const { reporterId } = req.body;
    if (reporterId) {
      await User.findByIdAndUpdate(reporterId, { avatar: avatarUrl });
    }

    return sendResponse(res, 200, 'Avatar uploaded successfully', { url: avatarUrl });
  } catch (error) {
    next(error);
  }
};

