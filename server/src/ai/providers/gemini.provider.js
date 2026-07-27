const { GoogleGenAI } = require('@google/genai');

class GeminiProvider {
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    this.defaultModel = process.env.AI_MODEL_PRIMARY || 'gemini-2.5-flash';
  }

  /**
   * Executes a prompt against Gemini API with retry and timeout.
   */
  async execute(promptConfig, options = {}) {
    const retries = options.retries || parseInt(process.env.AI_RETRY_ATTEMPTS, 10) || 3;
    const timeoutMs = options.timeout || parseInt(process.env.AI_TIMEOUT_MS, 10) || 15000;
    
    let attempt = 0;
    let lastError = null;

    while (attempt < retries) {
      try {
        const startTime = Date.now();
        const response = await this._executeWithTimeout(promptConfig, timeoutMs);
        const executionTime = Date.now() - startTime;

        let parsedData = null;
        if (options.expectJson) {
          parsedData = this._parseJson(response.text);
        } else {
          parsedData = response.text;
        }

        const usage = response.usageMetadata || {};
        
        // Return standard output format
        return {
          success: true,
          message: 'AI request completed successfully',
          data: parsedData,
          metadata: {
            provider: 'gemini',
            model: promptConfig.model || this.defaultModel,
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
        attempt++;
        lastError = error;
        // Simple exponential backoff
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
      }
    }

    // Standard error output
    return {
      success: false,
      message: 'AI request failed after retries',
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
