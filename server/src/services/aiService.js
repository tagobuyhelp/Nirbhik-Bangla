const providerFactory = require('../ai/providers');
const promptBuilder = require('../ai/builders/prompt.builder');
const aiValidator = require('../ai/validators/ai.validator');
const AILog = require('../models/AILog');

class AIService {
  async _executeAndLog(serviceName, promptName, promptConfig, validationType) {
    // 1. Execute via Provider Factory with Automatic Cross-Provider Fallback
    const response = await providerFactory.executeWithFallback(promptConfig, { expectJson: true });

    // 2. Validate output
    let validatedData = response.data;
    if (response.success && validationType) {
      validatedData = aiValidator.validate(validationType, response.data);
    }

    // 3. Log to Database asynchronously (fire and forget)
    AILog.create({
      service: serviceName,
      promptName,
      model: response.metadata.model,
      usage: response.usage,
      executionTimeMs: response.executionTime,
      status: response.success ? 'SUCCESS' : 'ERROR',
      errorMessage: response.error || null
    }).catch(err => console.error('Failed to log AI usage:', err.message));

    // 4. Return result
    if (!response.success) {
      console.warn(`[AI] ${serviceName} failed:`, response.error);
    }
    return response.success ? validatedData : null;
  }

  async generateHeadlines(text, lang = 'bn') {
    const config = promptBuilder.buildHeadline(text, lang);
    const data = await this._executeAndLog('AIHeadlineService', 'generate_headlines', config, 'headlines');
    return Array.isArray(data) && data.length > 0 ? data : [];
  }

  async translate(text, fromLang = 'bn', toLang = 'en') {
    const config = promptBuilder.buildTranslation(text, fromLang, toLang);
    const data = await this._executeAndLog('AITranslationService', 'translate_content', config, 'translation');
    if (data && typeof data.translation === 'string') return data.translation;
    if (typeof data === 'string') return data;
    return text;
  }

  async summarize(text, lang) {
    const config = promptBuilder.buildSummary(text, lang);
    const data = await this._executeAndLog('AISummaryService', 'generate_summary', config, 'summary');
    return data?.summary || 'Summary not available.';
  }

  async optimizeSEO(text) {
    const config = promptBuilder.buildSEO(text);
    const data = await this._executeAndLog('AISEOService', 'generate_seo', config, 'seo');
    return data || { title: 'Auto title', description: 'Auto desc', keywords: ['news'] };
  }

  async suggestTags(text, lang = 'bn') {
    const config = promptBuilder.buildTags(text, lang);
    const data = await this._executeAndLog('AITagService', 'suggest_tags', config, 'tags');
    return data || { tags: [] };
  }

  async generateSocialCaptions(title, excerpt, lang = 'bn') {
    const config = promptBuilder.buildSocialCaptions(title, excerpt, lang);
    const data = await this._executeAndLog('AISocialService', 'generate_social', config, 'social');
    return data || { facebook: '', twitter: '', whatsapp: '', telegram: '' };
  }

  async factCheck(text) {
    const config = promptBuilder.buildFactCheck(text);
    const data = await this._executeAndLog('AIFactCheckService', 'factcheck_content', config, 'factcheck');
    return data || { score: 100, flaggedClaims: [], verdict: 'Unverified' };
  }

  async editorAction(text, actionType) {
    const config = promptBuilder.buildEditorAction(text, actionType);
    const data = await this._executeAndLog('AIEditorService', 'editor_action', config, 'editor');
    return data?.editedText || text;
  }

  async generateImageAlt(title, excerpt = '', lang = 'bn') {
    const config = promptBuilder.buildImageAlt(title, excerpt, lang);
    const data = await this._executeAndLog('AIImageAltService', 'generate_image_alt', config, 'imagealt');
    return data || { altText: title, caption: title, credit: 'Nirbhik Bangla Photo' };
  }
}

module.exports = new AIService();
