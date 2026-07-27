const Category = require('../models/Category');
const sendResponse = require('../utils/responseHandler');

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    return sendResponse(res, 200, 'Categories fetched successfully', categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category
// @route   GET /api/v1/categories/:slug
// @access  Public
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    
    if (!category) {
      return sendResponse(res, 404, 'Category not found');
    }
    
    return sendResponse(res, 200, 'Category fetched successfully', category);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return sendResponse(res, 201, 'Category created successfully', category);
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return sendResponse(res, 404, 'Category not found');
    }

    return sendResponse(res, 200, 'Category updated successfully', category);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return sendResponse(res, 404, 'Category not found');
    }

    return sendResponse(res, 200, 'Category deleted successfully', {});
  } catch (error) {
    next(error);
  }
};
