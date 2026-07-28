const geminiProvider = require('./gemini.provider');
const openrouterProvider = require('./openrouter.provider');

class ProviderFactory {
  getProvider(name) {
    const openRouterKey = process.env.OPENROUTER_API_KEY || '';
    const hasValidOpenRouterKey = openRouterKey && !openRouterKey.startsWith('your_');
    const selected = (name || process.env.AI_PROVIDER || (hasValidOpenRouterKey ? 'openrouter' : 'gemini')).toLowerCase();

    if (selected === 'openrouter' && hasValidOpenRouterKey) {
      return openrouterProvider;
    }
    return geminiProvider;
  }

  async executeWithFallback(promptConfig, options = {}) {
    const primaryProvider = this.getProvider();
    const fallbackProvider = primaryProvider === openrouterProvider ? geminiProvider : openrouterProvider;

    let res = await primaryProvider.execute(promptConfig, options);
    if (res && res.success) return res;

    console.warn(`[ProviderFactory] Primary provider (${primaryProvider.constructor.name}) failed. Trying fallback provider (${fallbackProvider.constructor.name})...`);
    return await fallbackProvider.execute(promptConfig, options);
  }
}

module.exports = new ProviderFactory();
