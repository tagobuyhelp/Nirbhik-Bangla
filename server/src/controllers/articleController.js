const Article = require('../models/Article');
const sendResponse = require('../utils/responseHandler');
const socialService = require('../services/socialService');
const notificationController = require('./notificationController');

// @desc    Get all articles (admin view)
// @route   GET /api/v1/articles
// @access  Private
exports.getArticles = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search, categorySlug } = req.query;
    const query = {};

    if (status && status !== 'all') {
      const s = status.toLowerCase();
      query.$or = [
        { 'translations.bn.status': s },
        { 'translations.hi.status': s },
        { 'translations.en.status': s },
      ];
    }
    if (categorySlug && categorySlug !== 'all') {
      query.categorySlug = categorySlug;
    }
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [
        { 'translations.bn.title': searchRegex },
        { 'translations.hi.title': searchRegex },
        { 'translations.en.title': searchRegex },
        { authorName: searchRegex },
      ];
    }

    const parsedLimit = Math.max(1, parseInt(limit, 10) || 10);
    const parsedPage = Math.max(1, parseInt(page, 10) || 1);

    const articles = await Article.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    const total = await Article.countDocuments(query);
    const totalPages = Math.ceil(total / parsedLimit) || 1;

    return sendResponse(res, 200, 'Articles fetched successfully', articles, {
      total,
      page: parsedPage,
      limit: parsedLimit,
      pages: totalPages,
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

    // Trigger auto-posting in background if published and not shared yet
    const bnTrans = article.translations.get('bn') || article.translations.get(article.defaultLanguage);
    const shouldAutoShare = req.body.autoShareSocial !== false; // Default true unless explicitly false

    if (bnTrans && bnTrans.status === 'published') {
      if (!article.isShared && shouldAutoShare) {
        socialService.autoPostArticle(article).catch(err => console.error('Auto-post error:', err));
      }
      notificationController.sendPushToAllSubscribers({
        title: bnTrans.title || 'নির্ভীক বাংলা - ব্রেকিং নিউজ',
        body: (bnTrans.excerpt || bnTrans.title || '').substring(0, 100),
        image: article.featuredImageUrl || null,
        url: `https://nirbhikbangla.com/bn/news/${article.slug}`
      }).catch(err => console.error('Push notification error:', err));
    }

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

    // Trigger auto-posting in background if published and not shared yet
    const bnTrans = article.translations.get('bn') || article.translations.get(article.defaultLanguage);
    const shouldAutoShare = req.body.autoShareSocial !== false; // Default true unless explicitly false
    
    if (bnTrans && bnTrans.status === 'published' && !article.isShared && shouldAutoShare) {
      socialService.autoPostArticle(article).catch(err => console.error('Auto-post error:', err));
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
