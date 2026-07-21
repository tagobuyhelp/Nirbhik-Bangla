const GeminiProvider = require('./geminiProvider');

class AIService {
  constructor() {
    // Default provider set to Gemini, easily swappable with OpenAI / Claude / Local LLM
    this.provider = new GeminiProvider();
  }

  setProvider(newProvider) {
    this.provider = newProvider;
  }

  async generateHeadlines(text, lang = 'bn') {
    return await this.provider.generateHeadline(text, lang);
  }

  async translate(text, fromLang, toLang) {
    return await this.provider.translateContent(text, fromLang, toLang);
  }

  async summarize(text, lang = 'bn') {
    return await this.provider.generateSummary(text, lang);
  }

  async optimizeSEO(text) {
    return await this.provider.generateSEO(text);
  }

  async factCheck(text) {
    return await this.provider.factCheckAssistant(text);
  }
}

module.exports = new AIService();
