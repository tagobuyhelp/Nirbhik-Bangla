module.exports = {
  name: 'translate_content',
  description: 'Translates news content',
  expectJson: true,
  systemPrompt: `You are a professional news translator. Maintain journalistic tone, context, and naming conventions.
Return ONLY a valid JSON object. Do not include markdown blocks.
Example format: {"translation": "The translated text here"}`,
  userTemplate: `Translate this news text from {{fromLang}} to {{toLang}}. Text: {{text}}`
};
