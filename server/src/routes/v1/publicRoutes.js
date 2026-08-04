const express = require('express');
const router = express.Router();
const Article = require('../../models/Article');
const Category = require('../../models/Category');
const LiveStream = require('../../models/LiveStream');
const Video = require('../../models/Video');
const Playlist = require('../../models/Playlist');
const sendResponse = require('../../utils/responseHandler');

// GET /api/v1/public/playlists
router.get('/playlists', async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ isActive: true }).sort({ createdAt: -1 });
    return sendResponse(res, 200, 'Playlists fetched successfully', playlists);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/public/videos
router.get('/videos', async (req, res, next) => {
  try {
    const { category, search, limit = 20 } = req.query;
    const query = { status: 'Published' };

    if (category && category !== 'all') {
      query.category = new RegExp(category, 'i');
    }
    if (search) {
      query.$or = [
        { 'title.bn': new RegExp(search, 'i') },
        { 'title.en': new RegExp(search, 'i') },
        { 'title.hi': new RegExp(search, 'i') }
      ];
    }

    const videos = await Video.find(query).sort({ createdAt: -1 }).limit(parseInt(limit));
    return sendResponse(res, 200, 'Public videos fetched successfully', videos);
  } catch (error) {
    next(error);
  }
});
const { getActiveAds, trackAdClick, trackAdImpression } = require('../../controllers/adController');

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
    const { category, lang = 'bn', isFeatured, isBreaking, isTrending, isVideo, search, limit } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.categorySlug = category;
    }
    if (isFeatured === 'true') {
      query.isFeatured = true;
    }
    if (isBreaking === 'true') {
      query.isBreaking = true;
    }
    if (isTrending === 'true') {
      query.isTrending = true;
    }
    if (isVideo === 'true') {
      query.isVideo = true;
    }
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { 'translations.bn.title': searchRegex },
        { 'translations.en.title': searchRegex },
        { 'translations.hi.title': searchRegex },
        { 'translations.bn.content': searchRegex },
        { 'translations.en.content': searchRegex },
        { 'translations.hi.content': searchRegex },
        { categoryName: searchRegex },
        { categorySlug: searchRegex },
      ];
    }

    let articleQuery = Article.find(query).sort({ createdAt: -1 });
    if (limit && !isNaN(parseInt(limit))) {
      articleQuery = articleQuery.limit(parseInt(limit));
    }

    const articles = await articleQuery;

    // Build a set of unique category slugs to look up localized names
    const slugSet = new Set(articles.map((a) => a.categorySlug).filter(Boolean));
    const cats = await Category.find({ slug: { $in: [...slugSet] } }).lean();
    const catMap = {};
    cats.forEach((c) => { catMap[c.slug] = c.name; });

    const formatted = articles.map((art) => {
      const langData = art.translations.get(lang) || art.translations.get('bn') || {};
      const catNames = catMap[art.categorySlug];
      const localizedCategoryName = catNames
        ? (catNames[lang] || catNames.bn || art.categoryName)
        : art.categoryName;
      const tags = (langData.tags && langData.tags.length > 0) ? langData.tags : (art.tags || []);
      const imageCaption = langData.imageMetadata?.caption || art.imageMetadata?.caption || '';
      const imageCredit = langData.imageMetadata?.credit || art.imageMetadata?.credit || '';
      const imageAltText = langData.imageMetadata?.altText || art.imageMetadata?.altText || '';
      return {
        id: art._id,
        categorySlug: art.categorySlug,
        categoryName: localizedCategoryName,
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
        tags,
        imageCaption,
        imageCredit,
        imageAltText,
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
    let { slug } = req.params;
    const { lang = 'bn' } = req.query;

    if (!slug) {
      return sendResponse(res, 404, 'Article not found');
    }

    // Clean trailing slashes
    slug = slug.trim().replace(/\/+$/, '');
    // Strip trailing language suffix like -en, -bn, -hi if present
    const baseSlug = slug.replace(/-(en|bn|hi)$/i, '');

    const article = await Article.findOne({
      $or: [
        { 'translations.bn.slug': slug },
        { 'translations.en.slug': slug },
        { 'translations.hi.slug': slug },
        { 'translations.bn.slug': baseSlug },
        { 'translations.en.slug': baseSlug },
        { 'translations.hi.slug': baseSlug },
        { 'translations.bn.slug': new RegExp(`^${baseSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') },
        { 'translations.en.slug': new RegExp(`^${baseSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') },
        { 'translations.hi.slug': new RegExp(`^${baseSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') },
      ],
    });

    if (!article) {
      return sendResponse(res, 404, 'Article not found');
    }

    // Increment view count
    article.viewsCount = (article.viewsCount || 0) + 1;
    await article.save();

    const langData = article.translations.get(lang) || article.translations.get('bn') || {};

    // Look up the Category to get the localized name
    let localizedCategoryName = article.categoryName;
    if (article.categorySlug) {
      const cat = await Category.findOne({ slug: article.categorySlug }).lean();
      if (cat && cat.name) {
        localizedCategoryName = cat.name[lang] || cat.name.bn || article.categoryName;
      }
    }

    const tags = (langData.tags && langData.tags.length > 0) ? langData.tags : (article.tags || []);
    const imageCaption = langData.imageMetadata?.caption || article.imageMetadata?.caption || '';
    const imageCredit = langData.imageMetadata?.credit || article.imageMetadata?.credit || '';
    const imageAltText = langData.imageMetadata?.altText || article.imageMetadata?.altText || '';

    const formatted = {
      id: article._id,
      categorySlug: article.categorySlug,
      categoryName: localizedCategoryName,
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
      tags,
      imageCaption,
      imageCredit,
      imageAltText,
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

// GET /api/v1/public/livestreams
router.get('/livestreams', async (req, res, next) => {
  try {
    const streams = await LiveStream.find().sort({ isDefault: -1, createdAt: -1 });
    return sendResponse(res, 200, 'Live streams fetched successfully', streams);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/public/subscribe & /newsletter/subscribe
const NewsletterSubscriber = require('../../models/NewsletterSubscriber');
const ContactMessage = require('../../models/ContactMessage');
const Comment = require('../../models/Comment');

router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email || !email.includes('@')) {
      return sendResponse(res, 400, 'Valid email required');
    }
    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { email: email.toLowerCase().trim(), status: 'active', source: 'website' },
      { upsert: true, new: true }
    );
    return sendResponse(res, 200, 'Subscribed successfully', subscriber);
  } catch (error) {
    next(error);
  }
});

router.post('/newsletter/subscribe', async (req, res, next) => {
  try {
    const { email, source } = req.body || {};
    if (!email || !email.includes('@')) {
      return sendResponse(res, 400, 'Valid email required');
    }
    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { email: email.toLowerCase().trim(), status: 'active', source: source || 'website' },
      { upsert: true, new: true }
    );
    return sendResponse(res, 200, 'Subscribed to newsletter successfully', subscriber);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/public/contact
router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};
    if (!name || !email || !subject || !message) {
      return sendResponse(res, 400, 'Name, email, subject, and message are required.');
    }
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
    });
    return sendResponse(res, 201, 'Contact message submitted successfully.', newMessage);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/public/comments
router.get('/comments', async (req, res, next) => {
  try {
    const { articleSlug } = req.query;
    if (!articleSlug) {
      return sendResponse(res, 400, 'articleSlug query param is required');
    }
    const comments = await Comment.find({ articleSlug, status: 'approved' }).sort({ createdAt: -1 });
    return sendResponse(res, 200, 'Comments fetched successfully', comments);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/public/comments
router.post('/comments', async (req, res, next) => {
  try {
    const { articleSlug, name, email, comment } = req.body || {};
    if (!articleSlug || !name || !comment) {
      return sendResponse(res, 400, 'articleSlug, name, and comment are required.');
    }
    const newComment = await Comment.create({
      articleSlug,
      name,
      email: email || '',
      comment,
      status: 'approved',
    });
    return sendResponse(res, 201, 'Comment posted successfully', newComment);
  } catch (error) {
    next(error);
  }
});

// Admin List Contact Messages
router.get('/contact-messages', async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, 'Contact messages fetched', messages);
  } catch (error) {
    next(error);
  }
});

// Admin Delete Contact Message
router.delete('/contact-messages/:id', async (req, res, next) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, 'Contact message deleted');
  } catch (error) {
    next(error);
  }
});

// Admin List Newsletter Subscribers
router.get('/subscribers', async (req, res, next) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, 'Subscribers fetched', subscribers);
  } catch (error) {
    next(error);
  }
});

// Admin Delete Newsletter Subscriber
router.delete('/subscribers/:id', async (req, res, next) => {
  try {
    await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, 'Subscriber deleted');
  } catch (error) {
    next(error);
  }
});

// Admin List All Comments
router.get('/all-comments', async (req, res, next) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, 'All comments fetched', comments);
  } catch (error) {
    next(error);
  }
});

// Admin Update Comment Status
router.patch('/comments/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    return sendResponse(res, 200, 'Comment updated', comment);
  } catch (error) {
    next(error);
  }
});

// Admin Delete Comment
router.delete('/comments/:id', async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, 'Comment deleted');
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/public/ads
router.get('/ads', getActiveAds);
router.post('/ads/:id/click', trackAdClick);
router.post('/ads/:id/impression', trackAdImpression);

module.exports = router;
