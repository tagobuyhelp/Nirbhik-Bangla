const { GoogleGenAI } = require('@google/genai');

class GeminiProvider {
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    this.defaultModel = process.env.AI_MODEL_PRIMARY || 'gemini-2.0-flash';
  }

  /**
   * Executes a prompt against Gemini API with automatic model fallback on 429 / errors.
   */
  async execute(promptConfig, options = {}) {
    const modelsToTry = [
      promptConfig.model || this.defaultModel,
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-2.0-flash-lite'
    ];
    const models = [...new Set(modelsToTry)];
    const timeoutMs = options.timeout || parseInt(process.env.AI_TIMEOUT_MS, 10) || 15000;
    
    let lastError = null;

    for (const currentModel of models) {
      const currentConfig = { ...promptConfig, model: currentModel };
      try {
        const startTime = Date.now();
        const response = await this._executeWithTimeout(currentConfig, timeoutMs);
        const executionTime = Date.now() - startTime;

        let parsedData = null;
        if (options.expectJson) {
          parsedData = this._parseJson(response.text);
        } else {
          parsedData = response.text;
        }

        const usage = response.usageMetadata || {};
        
        return {
          success: true,
          message: 'AI request completed successfully',
          data: parsedData,
          metadata: {
            provider: 'gemini',
            model: currentModel,
            cached: false
          },
          usage: {
            promptTokens: usage.promptTokenCount || 0,
            completionTokens: usage.candidatesTokenCount || 0,
            totalTokens: usage.totalTokenCount || 0
          },
          executionTime
        };
      } catch (error) {
        lastError = error;
        console.warn(`[GeminiProvider] Model '${currentModel}' failed (${error.message}). Trying fallback...`);
      }
    }

    return {
      success: false,
      message: 'AI request failed on all fallback models',
      error: lastError ? lastError.message : 'Unknown error',
      metadata: { provider: 'gemini' },
      executionTime: 0
    };
  }

  _executeWithTimeout(promptConfig, timeoutMs) {
    const { contents, systemInstruction, model, generationConfig } = promptConfig;
    
    // Safety Settings (configurable later, using standard limits for news/journalism)
    // Here we can configure standard block thresholds.

    const reqConfig = {
      model: model || this.defaultModel,
      contents,
      config: {
        ...(systemInstruction && { systemInstruction }),
        ...(generationConfig && generationConfig),
      }
    };

    const aiCall = this.ai.models.generateContent(reqConfig);
    const timeoutCall = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI Request Timeout')), timeoutMs)
    );

    return Promise.race([aiCall, timeoutCall]);
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
      throw new Error('Failed to parse AI JSON response: ' + e.message);
    }
  }
}

module.exports = new GeminiProvider();
