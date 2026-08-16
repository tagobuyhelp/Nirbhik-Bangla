const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const sendResponse = require('../utils/responseHandler');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');

// Ensure avatars uploads dir exists
const avatarsDir = path.join(__dirname, '../../uploads/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return sendResponse(res, 400, 'Please provide an email and password');
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return sendResponse(res, 401, 'Invalid credentials');
    }

    if (!user.isActive) {
      return sendResponse(res, 401, 'Your account has been deactivated');
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return sendResponse(res, 401, 'Invalid credentials');
    }

    // Create token
    const token = generateToken(user._id);

    return sendResponse(res, 200, 'Login successful', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register user (Initial Super Admin or by Admin)
// @route   POST /api/v1/auth/register
// @access  Public (for first setup) or Private/Admin
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return sendResponse(res, 400, 'User already exists');
    }

    // Check if it's the very first user (make them SUPER_ADMIN)
    const userCount = await User.countDocuments();
    let assignedRole = role || 'Reporter';
    
    if (userCount === 0) {
      assignedRole = 'Super Admin';
    }

    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole
    });

    const token = generateToken(user._id);

    return sendResponse(res, 201, 'User registered successfully', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    return sendResponse(res, 200, 'User profile fetched', user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, bio, avatar, phone } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    return sendResponse(res, 200, 'Profile updated successfully', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      phone: user.phone
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload avatar to Cloudinary
// @route   PUT /api/v1/auth/avatar
// @access  Private
exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendResponse(res, 400, 'Please upload a file');
    }

    const fileBuffer = req.file.buffer;
    let avatarUrl = '';

    // Try Cloudinary upload (square crop, face gravity, webp)
    try {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'nirbhik_bangla/avatars',
            transformation: [
              { width: 300, height: 300, crop: 'fill', gravity: 'face' },
              { quality: 'auto' },
              { fetch_format: 'webp' }
            ]
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
      console.warn('[AVATAR UPLOAD]: Cloudinary failed, saving locally:', cloudErr.message);
      
      // Fallback local save
      const ext = path.extname(req.file.originalname) || '.jpg';
      const uniqueFilename = `avatar_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
      const filePath = path.join(avatarsDir, uniqueFilename);
      
      fs.writeFileSync(filePath, fileBuffer);
      
      const protocol = req.protocol || 'http';
      const host = req.get('host') || 'localhost:5000';
      avatarUrl = `${protocol}://${host}/uploads/avatars/${uniqueFilename}`;
    }

    // Update current user
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    user.avatar = avatarUrl;
    await user.save();

    return sendResponse(res, 200, 'Avatar uploaded successfully', {
      avatar: avatarUrl
    });
  } catch (error) {
    next(error);
  }
};
