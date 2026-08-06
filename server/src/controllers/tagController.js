const Tag = require('../models/Tag');
const sendResponse = require('../utils/responseHandler');

// @desc    Get all tags
// @route   GET /api/v1/tags
// @access  Public
exports.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().sort({ usageCount: -1 });
    return sendResponse(res, 200, 'Tags fetched successfully', tags);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new tag
// @route   POST /api/v1/tags
// @access  Private
exports.createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    return sendResponse(res, 201, 'Tag created successfully', tag);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single tag
// @route   GET /api/v1/tags/:id
// @access  Public
exports.getTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return sendResponse(res, 404, 'Tag not found');
    }
    return sendResponse(res, 200, 'Tag fetched successfully', tag);
  } catch (error) {
    next(error);
  }
};

// @desc    Update tag
// @route   PUT /api/v1/tags/:id
// @access  Private/Admin
exports.updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!tag) {
      return sendResponse(res, 404, 'Tag not found');
    }

    return sendResponse(res, 200, 'Tag updated successfully', tag);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tag
// @route   DELETE /api/v1/tags/:id
// @access  Private/Admin
exports.deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);

    if (!tag) {
      return sendResponse(res, 404, 'Tag not found');
    }

    return sendResponse(res, 200, 'Tag deleted successfully', {});
  } catch (error) {
    next(error);
  }
};
