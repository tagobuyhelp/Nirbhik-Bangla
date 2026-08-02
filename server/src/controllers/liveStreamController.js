const LiveStream = require('../models/LiveStream');
const sendResponse = require('../utils/responseHandler');

// @desc    Get all live streams
// @route   GET /api/v1/live-streams
// @access  Public
exports.getLiveStreams = async (req, res, next) => {
  try {
    let liveStreams = await LiveStream.find().sort({ createdAt: -1 });
    if (liveStreams.length === 0) {
      const defaultStream = await LiveStream.create({
        title: { bn: 'নির্ভীক বাংলা ২৪x৭ লাইভ নিউজ', en: 'Nirbhik Bangla 24x7 Live News' },
        description: { bn: 'সরাসরি খবরের আপডেট দেখতে থাকুন নির্ভীক বাংলায়।', en: 'Watch 24x7 live news updates on Nirbhik Bangla.' },
        streamUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        streamType: 'YouTube',
        isLive: true,
        isActive: true,
        isDefault: true,
        thumbnail: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80'
      });
      liveStreams = [defaultStream];
    }
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
