const Advertisement = require('../models/Advertisement');
const sendResponse = require('../utils/responseHandler');

// @desc    Get all advertisements
// @route   GET /api/v1/ads
// @access  Private/Admin
exports.getAds = async (req, res, next) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, 'Ads fetched successfully', ads);
  } catch (error) {
    next(error);
  }
};

// @desc    Get active advertisements for public frontend
// @route   GET /api/v1/public/ads
// @access  Public
exports.getActiveAds = async (req, res, next) => {
  try {
    const { slot } = req.query;
    const query = { isActive: true };
    if (slot) {
      query.locationSlot = slot;
    }
    
    // Also check date boundaries
    const now = new Date();
    query.$or = [
      { startDate: { $exists: false } },
      { startDate: null },
      { startDate: { $lte: now } }
    ];

    const ads = await Advertisement.find(query);
    return sendResponse(res, 200, 'Active ads fetched successfully', ads);
  } catch (error) {
    next(error);
  }
};

// @desc    Create an advertisement
// @route   POST /api/v1/ads
// @access  Private/Admin
exports.createAd = async (req, res, next) => {
  try {
    const ad = await Advertisement.create(req.body);
    return sendResponse(res, 201, 'Advertisement created successfully', ad);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an advertisement
// @route   PUT /api/v1/ads/:id
// @access  Private/Admin
exports.updateAd = async (req, res, next) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!ad) {
      return sendResponse(res, 404, 'Advertisement not found');
    }

    return sendResponse(res, 200, 'Advertisement updated successfully', ad);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an advertisement
// @route   DELETE /api/v1/ads/:id
// @access  Private/Admin
exports.deleteAd = async (req, res, next) => {
  try {
    const ad = await Advertisement.findByIdAndDelete(req.params.id);

    if (!ad) {
      return sendResponse(res, 404, 'Advertisement not found');
    }

    return sendResponse(res, 200, 'Advertisement deleted successfully', {});
  } catch (error) {
    next(error);
  }
};

// @desc    Track ad click
// @route   POST /api/v1/public/ads/:id/click
// @access  Public
exports.trackAdClick = async (req, res, next) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicksCount: 1 } },
      { new: true }
    );
    if (!ad) {
      return sendResponse(res, 404, 'Ad not found');
    }
    return sendResponse(res, 200, 'Click tracked');
  } catch (error) {
    next(error);
  }
};

// @desc    Track ad impression
// @route   POST /api/v1/public/ads/:id/impression
// @access  Public
exports.trackAdImpression = async (req, res, next) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { $inc: { impressionsCount: 1 } },
      { new: true }
    );
    if (!ad) {
      return sendResponse(res, 404, 'Ad not found');
    }
    return sendResponse(res, 200, 'Impression tracked');
  } catch (error) {
    next(error);
  }
};
