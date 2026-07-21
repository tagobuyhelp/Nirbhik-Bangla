class AIProviderInterface {
  async generateText(prompt) {
    throw new Error('Method generateText() must be implemented');
  }

  async generateHeadline(articleText, targetLanguage = 'bn') {
    throw new Error('Method generateHeadline() must be implemented');
  }

  async translateContent(text, sourceLang, targetLang) {
    throw new Error('Method translateContent() must be implemented');
  }

  async generateSummary(text, targetLang = 'bn') {
    throw new Error('Method generateSummary() must be implemented');
  }

  async generateSEO(text) {
    throw new Error('Method generateSEO() must be implemented');
  }

  async factCheckAssistant(text) {
    throw new Error('Method factCheckAssistant() must be implemented');
  }
}

module.exports = AIProviderInterface;
