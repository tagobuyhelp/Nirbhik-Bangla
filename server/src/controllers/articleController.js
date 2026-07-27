const Article = require('../models/Article');
const sendResponse = require('../utils/responseHandler');

// @desc    Get all articles (admin view)
// @route   GET /api/v1/articles
// @access  Private
exports.getArticles = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search, categorySlug } = req.query;
    const query = {};

    if (status) {
      query['translations.bn.status'] = status;
    }
    if (categorySlug) {
      query.categorySlug = categorySlug;
    }
    if (search) {
      query.$text = { $search: search };
    }

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Article.countDocuments(query);

    return sendResponse(res, 200, 'Articles fetched successfully', articles, {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single article
// @route   GET /api/v1/articles/:id
// @access  Private
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return sendResponse(res, 404, 'Article not found');
    }

    return sendResponse(res, 200, 'Article fetched successfully', article);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new article
// @route   POST /api/v1/articles
// @access  Private
exports.createArticle = async (req, res, next) => {
  try {
    // Basic validation
    if (!req.body.categorySlug || !req.body.translations) {
      return sendResponse(res, 400, 'Category and Translations are required');
    }

    // Set author
    if (!req.body.authorName) {
      req.body.authorName = req.user.name;
    }

    const article = await Article.create(req.body);

    return sendResponse(res, 201, 'Article created successfully', article);
  } catch (error) {
    next(error);
  }
};

// @desc    Update article
// @route   PUT /api/v1/articles/:id
// @access  Private
exports.updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!article) {
      return sendResponse(res, 404, 'Article not found');
    }

    return sendResponse(res, 200, 'Article updated successfully', article);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete article
// @route   DELETE /api/v1/articles/:id
// @access  Private/Admin
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return sendResponse(res, 404, 'Article not found');
    }

    return sendResponse(res, 200, 'Article deleted successfully', {});
  } catch (error) {
    next(error);
  }
};
