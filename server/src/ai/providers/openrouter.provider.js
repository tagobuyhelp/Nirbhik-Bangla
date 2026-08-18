class OpenRouterProvider {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    this.defaultModel = process.env.OPENROUTER_MODEL_PRIMARY || 'google/gemini-2.0-flash-exp:free';
    this.fallbackModels = [
      'google/gemini-2.0-flash-lite-001',
      'deepseek/deepseek-r1:free',
      'qwen/qwen-2.5-72b-instruct:free'
    ];
  }

  /**
   * Executes a prompt against OpenRouter API with model fallback on rate limit / error.
   */
  async execute(promptConfig, options = {}) {
    const primaryModel = promptConfig.model || this.defaultModel;
    const modelsToTry = [primaryModel, ...this.fallbackModels];
    const models = [...new Set(modelsToTry)];
    const timeoutMs = options.timeout || parseInt(process.env.AI_TIMEOUT_MS, 10) || 20000;

    let lastError = null;

    for (const currentModel of models) {
      try {
        const startTime = Date.now();
        const response = await this._callOpenRouter(promptConfig, currentModel, timeoutMs);
        const executionTime = Date.now() - startTime;

        let parsedData = null;
        if (options.expectJson || promptConfig.expectJson) {
          parsedData = this._parseJson(response.content);
        } else {
          parsedData = response.content;
        }

        return {
          success: true,
          message: 'OpenRouter AI request completed successfully',
          data: parsedData,
          metadata: {
            provider: 'openrouter',
            model: currentModel,
            cached: false
          },
          usage: response.usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
          executionTime
        };
      } catch (error) {
        lastError = error;
        console.warn(`[OpenRouterProvider] Model '${currentModel}' failed (${error.message}). Trying fallback model...`);
      }
    }

    return {
      success: false,
      message: 'AI request failed on all OpenRouter models',
      error: lastError ? lastError.message : 'Unknown error',
      metadata: { provider: 'openrouter' },
      executionTime: 0
    };
  }

  async _callOpenRouter(promptConfig, model, timeoutMs) {
    const { contents, systemInstruction } = promptConfig;
    const messages = [];

    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: contents });

    const payload = {
      model,
      messages,
      temperature: 0.7,
    };

    if (promptConfig.generationConfig?.responseMimeType === 'application/json') {
      payload.response_format = { type: 'json_object' };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || this.apiKey}`,
          'HTTP-Referer': 'https://nirbhikbangla.com',
          'X-Title': 'Nirbhik Bangla AI CMS',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`OpenRouter HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      const choice = data?.choices?.[0]?.message;
      if (!choice || !choice.content) {
        throw new Error('Invalid or empty response from OpenRouter API');
      }

      return {
        content: choice.content,
        usage: data?.usage || {}
      };
    } finally {
      clearTimeout(timer);
    }
  }

  _parseJson(rawText) {
    if (!rawText) return null;
    let cleanText = rawText.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```/, '').replace(/```$/, '');
    }
    try {
      return JSON.parse(cleanText.trim());
    } catch (e) {
      throw new Error('Failed to parse OpenRouter JSON response: ' + e.message);
    }
  }
}

module.exports = new OpenRouterProvider();
