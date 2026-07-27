const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendResponse = require('../utils/responseHandler');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return sendResponse(res, 401, 'Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return sendResponse(res, 401, 'User belonging to this token no longer exists.');
    }

    if (!req.user.isActive) {
      return sendResponse(res, 401, 'User account is deactivated.');
    }

    next();
  } catch (err) {
    return sendResponse(res, 401, 'Not authorized to access this route');
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendResponse(
        res,
        403,
        `User role '${req.user ? req.user.role : 'Unknown'}' is not authorized to access this route`
      );
    }
    next();
  };
};
