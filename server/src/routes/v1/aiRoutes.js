const express = require('express');
const router = express.Router();
const AIService = require('../../services/ai/aiService');
const sendResponse = require('../../utils/responseHandler');

// POST /api/v1/ai/headlines
router.post('/headlines', async (req, res, next) => {
  try {
    const { text, lang = 'bn' } = req.body;
    const headlines = await AIService.generateHeadlines(text, lang);
    return sendResponse(res, 200, 'AI headlines generated', headlines);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/translate
router.post('/translate', async (req, res, next) => {
  try {
    const { text, fromLang, toLang } = req.body;
    const translation = await AIService.translate(text, fromLang, toLang);
    return sendResponse(res, 200, 'AI translation completed', { translation });
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
    const { text } = req.body;
    const seoData = await AIService.optimizeSEO(text);
    return sendResponse(res, 200, 'AI SEO metadata generated', seoData);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/ai/fact-check
router.post('/fact-check', async (req, res, next) => {
  try {
    const { text } = req.body;
    const factCheckResult = await AIService.factCheck(text);
    return sendResponse(res, 200, 'AI fact check completed', factCheckResult);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
