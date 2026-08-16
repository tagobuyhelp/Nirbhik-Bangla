const Comment = require('../models/Comment');
const Article = require('../models/Article');
const sendResponse = require('../utils/responseHandler');

// @desc    Get all comments (with filtering/pagination)
// @route   GET /api/v1/comments
// @access  Private/Admin
exports.getComments = async (req, res, next) => {
  try {
    const { status, search, limit = 20, page = 1 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { comment: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const comments = await Comment.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Comment.countDocuments(query);

    return sendResponse(res, 200, 'Comments fetched successfully', comments, {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update comment status
// @route   PUT /api/v1/comments/:id/status
// @access  Private/Admin
exports.updateCommentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['approved', 'pending', 'spam'].includes(status)) {
      return sendResponse(res, 400, 'Invalid status');
    }

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!comment) {
      return sendResponse(res, 404, 'Comment not found');
    }

    return sendResponse(res, 200, 'Comment status updated successfully', comment);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/v1/comments/:id
// @access  Private/Admin
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return sendResponse(res, 404, 'Comment not found');
    }

    return sendResponse(res, 200, 'Comment deleted successfully', {});
  } catch (error) {
    next(error);
  }
};
