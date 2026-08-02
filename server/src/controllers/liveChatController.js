const LiveChat = require('../models/LiveChat');
const sendResponse = require('../utils/responseHandler');

// @desc    Get chat messages for a stream
// @route   GET /api/v1/live-streams/:id/chat
// @access  Public
exports.getLiveChats = async (req, res, next) => {
  try {
    const chats = await LiveChat.find({ streamId: req.params.id })
      .sort({ createdAt: -1 })
      .limit(50); // Get latest 50 messages
    return sendResponse(res, 200, 'Chats fetched successfully', chats.reverse());
  } catch (error) {
    next(error);
  }
};

// @desc    Post a chat message
// @route   POST /api/v1/live-streams/:id/chat
// @access  Public (or protected based on your auth model)
exports.createLiveChat = async (req, res, next) => {
  try {
    const { senderName, text } = req.body;
    if (!senderName || !text) {
      return sendResponse(res, 400, 'Sender name and text are required');
    }

    const chat = await LiveChat.create({
      streamId: req.params.id,
      senderName,
      text
    });

    return sendResponse(res, 201, 'Chat posted successfully', chat);
  } catch (error) {
    next(error);
  }
};
