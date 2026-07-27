const LiveStream = require('../models/LiveStream');
const sendResponse = require('../utils/responseHandler');

// @desc    Get all live streams
// @route   GET /api/v1/live-streams
// @access  Public
exports.getLiveStreams = async (req, res, next) => {
  try {
    const liveStreams = await LiveStream.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, 'Live streams fetched successfully', liveStreams);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single live stream
// @route   GET /api/v1/live-streams/:id
// @access  Public
exports.getLiveStream = async (req, res, next) => {
  try {
    const stream = await LiveStream.findById(req.params.id);
    
    if (!stream) {
      return sendResponse(res, 404, 'Live stream not found');
    }
    
    return sendResponse(res, 200, 'Live stream fetched successfully', stream);
  } catch (error) {
    next(error);
  }
};

// @desc    Create live stream
// @route   POST /api/v1/live-streams
// @access  Private/Admin
exports.createLiveStream = async (req, res, next) => {
  try {
    if (req.body.isDefault) {
      // Unset other defaults if this is set to default
      await LiveStream.updateMany({}, { isDefault: false });
    }
    
    const stream = await LiveStream.create(req.body);
    return sendResponse(res, 201, 'Live stream created successfully', stream);
  } catch (error) {
    next(error);
  }
};

// @desc    Update live stream
// @route   PUT /api/v1/live-streams/:id
// @access  Private/Admin
exports.updateLiveStream = async (req, res, next) => {
  try {
    if (req.body.isDefault) {
      await LiveStream.updateMany({ _id: { $ne: req.params.id } }, { isDefault: false });
    }

    const stream = await LiveStream.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!stream) {
      return sendResponse(res, 404, 'Live stream not found');
    }

    return sendResponse(res, 200, 'Live stream updated successfully', stream);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete live stream
// @route   DELETE /api/v1/live-streams/:id
// @access  Private/Admin
exports.deleteLiveStream = async (req, res, next) => {
  try {
    const stream = await LiveStream.findByIdAndDelete(req.params.id);

    if (!stream) {
      return sendResponse(res, 404, 'Live stream not found');
    }

    return sendResponse(res, 200, 'Live stream deleted successfully', {});
  } catch (error) {
    next(error);
  }
};
