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

  async translateVideo(title, description) {
    try {
      const bnTitle = title || '';
      const bnDesc = description || '';

      const enTitle = await this.translate(bnTitle, 'bn', 'en');
      const enDesc = bnDesc ? await this.translate(bnDesc, 'bn', 'en') : '';

      const hiTitle = await this.translate(bnTitle, 'bn', 'hi');
      const hiDesc = bnDesc ? await this.translate(bnDesc, 'bn', 'hi') : '';

      return {
        bn: { title: bnTitle, description: bnDesc },
        en: { title: enTitle || bnTitle, description: enDesc || bnDesc },
        hi: { title: hiTitle || bnTitle, description: hiDesc || bnDesc }
      };
    } catch (err) {
      console.error('Error in translateVideo:', err);
      return null;
    }
  }

  async translateTag(name) {
    try {
      const bnName = name || '';

      const enName = await this.translate(bnName, 'bn', 'en');
      const hiName = await this.translate(bnName, 'bn', 'hi');

      return {
        bn: bnName,
        en: enName || bnName,
        hi: hiName || bnName
      };
    } catch (err) {
      console.error('Error in translateTag:', err);
      return null;
    }
  }

  async summarize(text, lang) {
    const config = promptBuilder.buildSummary(text, lang);
    const data = await this._executeAndLog('AISummaryService', 'generate_summary', config, 'summary');
    return data?.summary || 'Summary not available.';
  }

  async optimizeSEO(title, description = '', lang = 'bn') {
    const config = promptBuilder.buildSEO(title, description, lang);
    const data = await this._executeAndLog('AISEOService', 'generate_seo', config, 'seo');
    return data || {
      seoTitle: `${title} | Nirbhik Bangla`,
      seoDescription: description ? description.slice(0, 160) : title,
      slug: title ? title.toLowerCase().trim().replace(/\s+/g, '-') : 'video-news',
      keywords: ['NirbhikBangla', 'News', 'Video'],
      altText: title
    };
  }

  async suggestTags(text, lang = 'bn') {
    const inputText = text || 'সর্বশেষ সংবাদ, রাজনীতি, বিনোদন, আবহাওয়া, খেলাধুলা, চাকরি ও অর্থনীতি বিষয়সূচি';
    const config = promptBuilder.buildTags(inputText, lang);
    const data = await this._executeAndLog('AITagService', 'suggest_tags', config, 'tags');
    
    const tagList = (data && Array.isArray(data.tags) && data.tags.length > 0)
      ? data.tags
      : ['উপদেষ্টা পরিষদ', 'শেয়ারবাজার', 'জলবায়ু পরিবর্তন', 'টি২০ কাপ', 'রেমিট্যান্স'];

    const suggestions = tagList.slice(0, 5).map((name, index) => ({
      id: Date.now() + index,
      name,
      relevance: index < 2 ? 'High Relevance' : 'Medium',
      relColor: index < 2 
        ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
        : 'text-amber-700 bg-amber-50 border-amber-200'
    }));

    return { suggestions, tags: tagList };
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

  async generateTagDescription(tagName, lang = 'bn') {
    const config = promptBuilder.buildTagDescription(tagName, lang);
    const data = await this._executeAndLog('AITagDescService', 'generate_tag_description', config, 'tagdesc');
    const bnDesc = data?.description || `${tagName} সম্পর্কিত সর্বশেষ খবর ও আপডেট।`;
    
    const enDesc = await this.translate(bnDesc, 'bn', 'en');
    const hiDesc = await this.translate(bnDesc, 'bn', 'hi');

    return {
      bn: bnDesc,
      en: enDesc || bnDesc,
      hi: hiDesc || bnDesc
    };
  }
}

module.exports = new AIService();
