# 04 - Gemini Provider Architecture

The `GeminiProvider` is a Singleton class that acts as the absolute single source of truth for communicating with the `@google/genai` SDK.

## Responsibilities

1. **Initialization:** Securely loads the `GEMINI_API_KEY` and initializes the model (e.g., `gemini-2.5-flash`).
2. **Retry Mechanism:** Automatically retries on network failures or `429 Too Many Requests`. Implements exponential backoff.
3. **Timeouts:** Ensures AI requests don't hang the server indefinitely. Default timeout of 15-30 seconds depending on the operation.
4. **Safety & Blocking:** Handles Google's safety filter blocks gracefully without crashing the application.
5. **Rate Limiting:** Protects the platform from exhausting the API quota.
6. **JSON Output Extraction:** Parses raw text, strips markdown (`\`\`\`json`), and safely runs `JSON.parse`.
7. **Logging & Token Usage:** Tracks `usageMetadata` (promptTokens, candidatesTokens, totalTokens) for cost analysis.

## Core Interface

```javascript
class GeminiProvider {
  /**
   * Executes a prompt securely against the Gemini API.
   * @param {Object} promptConfig - { systemInstruction, contents, responseSchema }
   * @param {Object} options - { timeout, retries, bypassCache }
   */
  async execute(promptConfig, options = {}) {
    // 1. Check Cache
    // 2. Rate Limit Check
    // 3. Execute with Timeout & Retry
    // 4. Log Tokens & Latency
    // 5. Parse & Return standardized response
  }
}
```

## Unified Output Format

Every response from the provider (and ultimately the AI APIs) must strictly conform to:

```json
{
  "success": true,
  "message": "SEO metadata generated successfully.",
  "data": {
    "title": "...",
    "metaDescription": "..."
  },
  "metadata": {
    "provider": "gemini",
    "model": "gemini-2.5-flash",
    "cached": false
  },
  "usage": {
    "promptTokens": 120,
    "completionTokens": 50,
    "totalTokens": 170
  },
  "executionTime": 1250 
}
```
