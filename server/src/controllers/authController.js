const User = require('../models/User');
const sendResponse = require('../utils/responseHandler');
const jwt = require('jsonwebtoken');

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
    const { name, email, password, role } = req.body;

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
