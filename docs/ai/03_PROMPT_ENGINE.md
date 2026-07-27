# 03 - Prompt Engine & Management

Hardcoding AI prompts directly into services or controllers creates technical debt. The Prompt Engine provides a scalable architecture for registering, loading, and injecting variables into `.prompt.js` templates.

## Structure

```text
server/src/ai/prompts/
├── engine.prompt.js          # The Core Prompt Loader
└── templates/
    ├── headline.prompt.js
    ├── translate.prompt.js
    ├── seo.prompt.js
    ├── summary.prompt.js
    ├── factcheck.prompt.js
    ├── rewrite.prompt.js
    ├── expand.prompt.js
    ├── shorten.prompt.js
    ├── category.prompt.js
    ├── tags.prompt.js
    ├── video.prompt.js
    └── livestream.prompt.js
```

## Anatomy of a Prompt File (`headline.prompt.js`)

```javascript
module.exports = {
  name: 'generate_headlines',
  version: '1.0.0',
  description: 'Generates diverse headlines for a given news article.',
  systemPrompt: `You are an expert news editor. Your goal is to write captivating headlines. 
Return ONLY a valid JSON array of strings. Do not include markdown formatting like \`\`\`json.`,
  userTemplate: `Article Text: {{text}}
Language: {{language}}
Context: {{context}}

Generate exactly 5 headlines.`,
  validationSchema: {
    type: 'array',
    items: { type: 'string' },
    minItems: 5,
    maxItems: 5
  }
};
```

## The Prompt Builder (`builders/prompt.builder.js`)

Instead of string concatenation, the `PromptBuilder` provides strict methods.

```javascript
class PromptBuilder {
  
  static buildHeadline(data) {
    // 1. Load headline.prompt.js
    // 2. Validate input data { text, language, context }
    // 3. Inject variables into userTemplate replacing {{keys}}
    // 4. Return compiled Prompt Object { system, user, schema }
  }
  
  static buildSEO(data) { ... }
  static buildTranslation(data) { ... }
  static buildSummary(data) { ... }
  static buildFactCheck(data) { ... }
}
```

This enforces strict prompt typing and prevents injection vulnerabilities or missing parameters.
