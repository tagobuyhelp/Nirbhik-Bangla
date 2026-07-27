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

  buildHeadline(text, lang) {
    return this.compile('generate_headlines', { text, lang }, true);
  }

  buildTranslation(text, fromLang, toLang) {
    return this.compile('translate_content', { text, fromLang, toLang }, true);
  }

  buildSEO(text) {
    return this.compile('generate_seo', { text }, true);
  }

  buildSummary(text, lang) {
    return this.compile('generate_summary', { text, lang }, true);
  }
  
  buildTags(text, lang) {
    return this.compile('suggest_tags', { text, lang }, true);
  }
  
  buildSocialCaptions(title, excerpt, lang) {
    return this.compile('generate_social', { title, excerpt, lang }, true);
  }
}

module.exports = new PromptBuilder();
