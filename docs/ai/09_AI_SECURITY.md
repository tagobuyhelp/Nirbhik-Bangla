# 09 - AI Security & Moderation

Integrating LLMs introduces risks (Prompt Injection, Unsafe content generation, Malformed JSON). The AI layer must implement strict security protocols.

## 1. Input Sanitization
*   **Prompt Length Limits:** Truncate extremely long inputs before passing to Gemini to prevent token exhaustion attacks.
*   **HTML/Markdown Stripping:** Remove executable code blocks from user inputs before injecting them into prompt templates.

## 2. Output Validation (Validators)
LLMs occasionally hallucinate formats.
*   **JSON Schema Enforcement:** Every JSON response from Gemini must pass through an `AIValidator` (e.g., using Joi or Zod).
*   **Fallback Defaults:** If validation fails (e.g., Gemini returns a string instead of an Array), the service must return a safe fallback instead of crashing the API.

## 3. Google Gemini Safety Settings
Always configure the `GeminiProvider` with appropriate safety thresholds:

```javascript
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];
```

## 4. Timeout & Deadlocks
*   Every `genai` SDK call must be wrapped in a `Promise.race()` with a timeout to prevent the Node.js event loop from hanging.
