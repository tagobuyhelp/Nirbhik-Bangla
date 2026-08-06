const promptEngine = require('../prompts/engine.prompt');

class PromptBuilder {
  /**
   * Replaces placeholders like {{key}} with actual values
   */
  _injectVariables(template, variables) {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    }
    return result;
  }

  /**
   * General compile method for all prompts
   */
  compile(promptName, variables, expectJson = true) {
    const template = promptEngine.getPrompt(promptName);
    
    // Inject dynamic data
    const compiledUserPrompt = this._injectVariables(template.userTemplate, variables);

    // Build execution config matching GeminiProvider signature
    const config = {
      model: template.model || undefined, // Will default to provider's default if not set
      systemInstruction: template.systemPrompt,
      contents: compiledUserPrompt,
      generationConfig: {}
    };

    if (expectJson || template.expectJson) {
      config.generationConfig.responseMimeType = 'application/json';
      // If we implement Google's structured response schema feature:
      // if (template.validationSchema) {
      //   config.generationConfig.responseSchema = template.validationSchema;
      // }
    }

    return config;
  }

  // --- Specific Builders for type safety ---

  buildHeadline(text, lang = 'bn') {
    const langNames = { bn: 'Bengali', en: 'English', hi: 'Hindi' };
    const fullLang = langNames[lang] || lang;
    return this.compile('generate_headlines', { text, lang: fullLang }, true);
  }

  buildTranslation(text, fromLang = 'bn', toLang = 'en') {
    const langNames = { bn: 'Bengali', en: 'English', hi: 'Hindi' };
    const fullFrom = langNames[fromLang] || fromLang;
    const fullTo = langNames[toLang] || toLang;
    return this.compile('translate_content', { text, fromLang: fullFrom, toLang: fullTo }, true);
  }

  buildSEO(title, description = '', lang = 'bn') {
    return this.compile('generate_seo', { title, description, lang }, true);
  }

  buildSummary(text, lang) {
    return this.compile('generate_summary', { text, lang }, true);
  }
  
  buildTags(text, lang = 'bn') {
    return this.compile('suggest_tags', { text, lang }, true);
  }
  
  buildSocialCaptions(title, excerpt = '', lang = 'bn') {
    return this.compile('generate_social', { title, excerpt, lang }, true);
  }

  buildFactCheck(text) {
    return this.compile('factcheck_content', { text }, true);
  }

  buildEditorAction(text, actionType) {
    let instruction = '';
    switch (actionType) {
      case 'rewrite':
        instruction = 'Rewrite the provided text to be more professional, engaging, and grammatically correct while maintaining the original meaning.';
        break;
      case 'expand':
        instruction = 'Expand the provided text by adding more relevant details, context, and elaboration. Keep it factual and natural.';
        break;
      case 'shorten':
        instruction = 'Shorten and summarize the provided text to be concise and direct, removing fluff but keeping key information.';
        break;
      case 'headlines':
      case 'write':
        instruction = 'Format the text with bold catchy headings and well-structured paragraphs suitable for a news portal article.';
        break;
      default:
        instruction = 'Enhance and polish the provided news article text.';
    }
    return this.compile('editor_action', { text, instruction }, true);
  }

  buildImageAlt(title, excerpt = '', lang = 'bn') {
    return this.compile('generate_image_alt', { title, excerpt, lang }, true);
  }

  buildTagDescription(tagName, lang = 'bn') {
    const langNames = { bn: 'Bengali', en: 'English', hi: 'Hindi' };
    const fullLang = langNames[lang] || lang;
    return this.compile('generate_tag_description', { tagName, lang: fullLang }, true);
  }
}

module.exports = new PromptBuilder();
