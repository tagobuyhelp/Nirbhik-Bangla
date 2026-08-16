const Setting = require('../models/Setting');
const sendResponse = require('../utils/responseHandler');

// @desc    Get all settings
// @route   GET /api/v1/settings
// @access  Public (frontend needs some settings like siteName, so we expose it publicly. Or auth-protected, but let's make it private for now)
exports.getSettings = async (req, res, next) => {
  try {
    const settings = await Setting.find({});
    
    // Convert array to a key-value object for easier frontend consumption
    const formattedSettings = {};
    settings.forEach(setting => {
      formattedSettings[setting.key] = setting.value;
    });

    return sendResponse(res, 200, 'Settings fetched successfully', formattedSettings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update settings (bulk)
// @route   PUT /api/v1/settings
// @access  Private/Admin
exports.updateSettings = async (req, res, next) => {
  try {
    const updates = req.body;
    
    if (!updates || typeof updates !== 'object') {
      return sendResponse(res, 400, 'Invalid settings data format');
    }

    // Perform an upsert for each setting key
    const operations = Object.keys(updates).map(key => {
      return {
        updateOne: {
          filter: { key: key },
          update: { $set: { key: key, value: updates[key] } },
          upsert: true
        }
      };
    });

    if (operations.length > 0) {
      await Setting.bulkWrite(operations);
    }

    return sendResponse(res, 200, 'Settings updated successfully');
  } catch (error) {
    next(error);
  }
};
