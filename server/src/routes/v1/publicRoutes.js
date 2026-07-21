const express = require('express');
const router = express.Router();
const Article = require('../../models/Article');
const Category = require('../../models/Category');
const LiveStream = require('../../models/LiveStream');
const sendResponse = require('../../utils/responseHandler');

// Default initial categories if DB is empty
const defaultCategories = [
  { name: { bn: 'প্রচ্ছদ', en: 'Home', hi: 'होम' }, slug: 'home', order: 1, isActive: true },
  { name: { bn: 'ব্রেকিং নিউজ', en: 'Breaking News', hi: 'ब्रेकिंग न्यूज़' }, slug: 'breaking', order: 2, isActive: true },
  { name: { bn: 'পশ্চিম বর্ধমান', en: 'Paschim Bardhaman', hi: 'पश्चिम बर्धमान' }, slug: 'paschim-bardhaman', order: 3, isActive: true },
  { name: { bn: 'আসানসোল', en: 'Asansol', hi: 'आसनसोल' }, slug: 'asansol', order: 4, isActive: true },
  { name: { bn: 'দুর্গাপুর', en: 'Durgapur', hi: 'दुर्गापुर' }, slug: 'durgapur', order: 5, isActive: true },
  { name: { bn: 'রাজ্য', en: 'State', hi: 'राज्य' }, slug: 'rajya', order: 6, isActive: true },
  { name: { bn: 'দেশ', en: 'National', hi: 'देश' }, slug: 'desh', order: 7, isActive: true },
  { name: { bn: 'বিশ্ব', en: 'World', hi: 'दुनिया' }, slug: 'biswa', order: 8, isActive: true },
  { name: { bn: 'খেলা', en: 'Sports', hi: 'खेल' }, slug: 'khela', order: 9, isActive: true },
  { name: { bn: 'বিনোদন', en: 'Entertainment', hi: 'मनोरंजन' }, slug: 'binodon', order: 10, isActive: true },
  { name: { bn: 'লাইফস্টাইল', en: 'Lifestyle', hi: 'लाइफस्टाइल' }, slug: 'lifestyle', order: 11, isActive: true },
  { name: { bn: 'প্রযুক্তি', en: 'Technology', hi: 'तकनीक' }, slug: 'projukti', order: 12, isActive: true },
  { name: { bn: 'ভিডিও', en: 'Video', hi: 'वीडियो' }, slug: 'video', order: 13, isActive: true },
];

// GET /api/v1/public/news
router.get('/news', async (req, res, next) => {
  try {
    const { category, lang = 'bn', isFeatured, isBreaking } = req.query;
    const query = {};

    if (category) {
      query.categorySlug = category;
    }
    if (isFeatured === 'true') {
      query.isFeatured = true;
    }
    if (isBreaking === 'true') {
      query.isBreaking = true;
    }

    const articles = await Article.find(query).sort({ createdAt: -1 });

    const formatted = articles.map((art) => {
      const langData = art.translations.get(lang) || art.translations.get('bn') || {};
      return {
        id: art._id,
        categorySlug: art.categorySlug,
        categoryName: art.categoryName,
        featuredImageUrl: art.featuredImageUrl,
        galleryUrls: art.galleryUrls,
        videoUrl: art.videoUrl,
        isVideo: art.isVideo,
        isBreaking: art.isBreaking,
        isFeatured: art.isFeatured,
        isTrending: art.isTrending,
        viewsCount: art.viewsCount,
        title: langData.title || '',
        slug: langData.slug || '',
        excerpt: langData.excerpt || '',
        content: langData.content || '',
        seo: langData.seo || {},
        author: art.authorName,
        publishedAt: art.publishedAt || art.createdAt,
      };
    });

    return sendResponse(res, 200, 'Published news fetched successfully', formatted);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/public/news/by-slug/:slug
router.get('/news/by-slug/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { lang = 'bn' } = req.query;

    const article = await Article.findOne({
      $or: [
        { 'translations.bn.slug': slug },
        { 'translations.en.slug': slug },
        { 'translations.hi.slug': slug },
      ],
    });

    if (!article) {
      return sendResponse(res, 404, 'Article not found');
    }

    // Increment view count
    article.viewsCount = (article.viewsCount || 0) + 1;
    await article.save();

    const langData = article.translations.get(lang) || article.translations.get('bn') || {};

    const formatted = {
      id: article._id,
      categorySlug: article.categorySlug,
      categoryName: article.categoryName,
      featuredImageUrl: article.featuredImageUrl,
      galleryUrls: article.galleryUrls,
      videoUrl: article.videoUrl,
      isVideo: article.isVideo,
      isBreaking: article.isBreaking,
      isFeatured: article.isFeatured,
      isTrending: article.isTrending,
      viewsCount: article.viewsCount,
      title: langData.title || '',
      slug: langData.slug || '',
      excerpt: langData.excerpt || '',
      content: langData.content || '',
      seo: langData.seo || {},
      author: article.authorName,
      publishedAt: article.publishedAt || article.createdAt,
    };

    return sendResponse(res, 200, 'Article fetched successfully', formatted);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/public/breaking
router.get('/breaking', async (req, res, next) => {
  try {
    const { lang = 'bn' } = req.query;
    const articles = await Article.find({ isBreaking: true }).sort({ createdAt: -1 }).limit(10);

    const formatted = articles.map((art) => {
      const langData = art.translations.get(lang) || art.translations.get('bn') || {};
      return {
        id: art._id,
        title: langData.title || '',
        slug: langData.slug || '',
      };
    });

    return sendResponse(res, 200, 'Breaking news fetched successfully', formatted);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/public/categories
router.get('/categories', async (req, res, next) => {
  try {
    let categories = await Category.find({ isActive: true }).sort({ order: 1 });
    if (categories.length === 0) {
      categories = await Category.insertMany(defaultCategories);
    }
    return sendResponse(res, 200, 'Categories fetched successfully', categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
