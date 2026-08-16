const express = require('express');
const router = express.Router();
const AIService = require('../../services/aiService');
const sendResponse = require('../../utils/responseHandler');

// POST /api/v1/ai/headlines
router.post('/headlines', async (req, res, next) => {
  try {
    const { text, lang = 'bn' } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length < 10) {
      return sendResponse(res, 400, 'Article text (at least 10 characters) is required to generate headlines');
    }
    const headlines = await AIService.generateHeadlines(text, lang);
    return sendResponse(res, 200, 'AI headlines generated', headlines);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/translate
router.post('/translate', async (req, res, next) => {
  try {
    const { text, fromLang = 'bn', toLang = 'en' } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return sendResponse(res, 400, 'Text is required for translation');
    }
    const translation = await AIService.translate(text, fromLang, toLang);
    return sendResponse(res, 200, 'AI translation completed', { translation });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/translate-video
router.post('/translate-video', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return sendResponse(res, 400, 'Title is required for video translation');
    }
    const translations = await AIService.translateVideo(title, description || '');
    return sendResponse(res, 200, 'AI video translation completed', translations);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/translate-tag
router.post('/translate-tag', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return sendResponse(res, 400, 'Name is required for tag translation');
    }
    const translations = await AIService.translateTag(name);
    return sendResponse(res, 200, 'AI tag translation completed', translations);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/summary
router.post('/summary', async (req, res, next) => {
  try {
    const { text, lang = 'bn' } = req.body;
    const summary = await AIService.summarize(text, lang);
    return sendResponse(res, 200, 'AI summary generated', { summary });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/seo
router.post('/seo', async (req, res, next) => {
  try {
    const { title, description, text, lang = 'bn' } = req.body;
    const inputTitle = title || text || '';
    if (!inputTitle) {
      return sendResponse(res, 400, 'Title or text is required for SEO generation');
    }
    const seoData = await AIService.optimizeSEO(inputTitle, description || '', lang);
    return sendResponse(res, 200, 'AI SEO metadata generated', seoData);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/fact-check
router.post('/fact-check', async (req, res, next) => {
  try {
    const { text } = req.body;
    const factCheck = await AIService.factCheck(text);
    return sendResponse(res, 200, 'AI fact-check completed', factCheck);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/generate-social
router.post('/generate-social', async (req, res, next) => {
  try {
    const { title, excerpt, lang = 'bn' } = req.body;
    const captions = await AIService.generateSocialCaptions(title, excerpt, lang);
    return sendResponse(res, 200, 'AI social captions generated', captions);
  } catch (error) {
    next(error);
  }
});

// GET & POST /api/v1/ai/suggest-tags
router.route('/suggest-tags')
  .get(async (req, res, next) => {
    try {
      const tags = await AIService.suggestTags('', req.query.lang || 'bn');
      return sendResponse(res, 200, 'AI tags suggested', tags);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { text, lang = 'bn' } = req.body;
      const tags = await AIService.suggestTags(text, lang);
      return sendResponse(res, 200, 'AI tags suggested', tags);
    } catch (error) {
      next(error);
    }
  });

// POST /api/v1/ai/editor
router.post('/editor', async (req, res, next) => {
  try {
    const { text, actionType } = req.body;
    const editedText = await AIService.editorAction(text, actionType);
    return sendResponse(res, 200, 'AI editor action completed', { editedText });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/image-alt
router.post('/image-alt', async (req, res, next) => {
  try {
    const { title, excerpt, lang } = req.body;
    const metadata = await AIService.generateImageAlt(title, excerpt, lang || 'bn');
    return sendResponse(res, 200, 'AI image metadata generated', metadata);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/generate-tag-description
router.post('/generate-tag-description', async (req, res, next) => {
  try {
    const { tagName, lang = 'bn' } = req.body;
    if (!tagName) {
      return sendResponse(res, 400, 'Tag name is required');
    }
    const description = await AIService.generateTagDescription(tagName, lang);
    return sendResponse(res, 200, 'AI tag description generated', { description });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/social-captions
router.post('/social-captions', async (req, res, next) => {
  try {
    const { title, excerpt, lang = 'bn' } = req.body;
    if (!title) {
      return sendResponse(res, 400, 'Title is required for social captions');
    }
    const captions = await AIService.generateSocialCaptions(title, excerpt, lang);
    return sendResponse(res, 200, 'AI social captions generated', captions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
