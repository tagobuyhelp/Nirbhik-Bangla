const Poll = require('../models/Poll');
const sendResponse = require('../utils/responseHandler');

// @desc    Get active poll
// @route   GET /api/v1/polls/active
// @access  Public
exports.getActivePoll = async (req, res, next) => {
  try {
    let poll = await Poll.findOne({ isActive: true }).sort({ createdAt: -1 });
    
    // Auto seed a poll if none exists (for demo)
    if (!poll) {
      poll = await Poll.create({
        question: 'আপনার মতে কোন দল জিতবে?',
        options: [
          { text: 'দল A', votes: 1245, color: 'purple-600' },
          { text: 'দল B', votes: 562, color: 'purple-300' },
          { text: 'দল C', votes: 201, color: 'slate-300' }
        ],
        isActive: true
      });
    }

    return sendResponse(res, 200, 'Active poll fetched', poll);
  } catch (error) {
    next(error);
  }
};

// @desc    Vote on poll
// @route   POST /api/v1/polls/:id/vote
// @access  Public
exports.votePoll = async (req, res, next) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll || !poll.isActive) {
      return sendResponse(res, 400, 'Poll is not active or found');
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return sendResponse(res, 400, 'Invalid option index');
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    return sendResponse(res, 200, 'Vote recorded', poll);
  } catch (error) {
    next(error);
  }
};
