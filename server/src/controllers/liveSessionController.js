const LiveSession = require('../models/LiveSession');
const sendResponse = require('../utils/responseHandler');

// Utility function to get or init global io (will be set from index.js)
let ioInstance = null;
exports.setIo = (io) => {
  ioInstance = io;
};

// @desc    Get current live session or next scheduled
// @route   GET /api/v1/live/current
// @access  Public
exports.getCurrentLiveSession = async (req, res, next) => {
  try {
    // First, look for any 'live', 'starting', 'paused', or 'reconnecting' session
    let session = await LiveSession.findOne({
      status: { $in: ['live', 'starting', 'paused', 'reconnecting'] }
    }).sort({ startedAt: -1 });

    if (!session) {
      // Look for the next upcoming scheduled session
      session = await LiveSession.findOne({
        status: 'scheduled',
        scheduledAt: { $gte: new Date(Date.now() - 3600000) } // allow recent scheduled ones
      }).sort({ scheduledAt: 1 });
    }
    
    if (!session) {
      // Look for a draft or offline if no active found, just so the player has something if needed, or return null
      session = await LiveSession.findOne({ status: 'archived' }).sort({ endedAt: -1 });
      if (!session) {
         return res.json({ success: true, data: null });
      }
    }

    res.json({ success: true, data: session });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all live sessions
// @route   GET /api/v1/live/sessions
// @access  Public/Admin
exports.getLiveSessions = async (req, res, next) => {
  try {
    const { status, limit = 20, page = 1 } = req.query;
    const query = {};
    if (status) query.status = status;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const sessions = await LiveSession.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await LiveSession.countDocuments(query);
      
    res.json({ 
      success: true, 
      data: sessions,
      meta: { total, page: parseInt(page), limit: parseInt(limit) }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create live session
// @route   POST /api/v1/live/session
// @access  Private/Admin
exports.createLiveSession = async (req, res, next) => {
  try {
    const session = await LiveSession.create({
      ...req.body,
      createdBy: req.user ? req.user._id : undefined
    });
    res.status(201).json({ success: true, data: session });
  } catch (error) {
    next(error);
  }
};

// @desc    Update live session
// @route   PUT /api/v1/live/session/:id
// @access  Private/Admin
exports.updateLiveSession = async (req, res, next) => {
  try {
    const session = await LiveSession.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user ? req.user._id : undefined },
      { new: true, runValidators: true }
    );
    if (!session) {
      return sendResponse(res, 404, 'Live Session not found');
    }
    if (ioInstance) {
      ioInstance.emit('live_updated', session);
    }
    res.json({ success: true, data: session });
  } catch (error) {
    next(error);
  }
};

// @desc    Update live session status
// @route   PUT /api/v1/live/session/:id/status
// @access  Private/Admin
exports.updateLiveSessionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updateData = { status, updatedBy: req.user ? req.user._id : undefined };
    
    if (status === 'live') {
      updateData.startedAt = new Date();
    } else if (status === 'ended' || status === 'archived') {
      updateData.endedAt = new Date();
    }

    const session = await LiveSession.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!session) {
      return sendResponse(res, 404, 'Live Session not found');
    }
    
    if (ioInstance) {
      if (status === 'live') ioInstance.emit('live_started', session);
      else if (status === 'ended' || status === 'archived') ioInstance.emit('stream_ended', session);
      else ioInstance.emit('live_updated', session);
    }

    res.json({ success: true, data: session });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete live session
// @route   DELETE /api/v1/live/session/:id
// @access  Private/Admin
exports.deleteLiveSession = async (req, res, next) => {
  try {
    const session = await LiveSession.findById(req.params.id);
    if (!session) {
      return sendResponse(res, 404, 'Live Session not found');
    }
    
    session.deletedAt = new Date();
    await session.save();
    
    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
