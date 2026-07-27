module.exports = {
  name: 'generate_summary',
  description: 'Summarizes news articles',
  expectJson: true,
  systemPrompt: `You are a news summarizer. Output ONLY a valid JSON object. No markdown formatting.
Example: {"summary": "A brief summary of the article."}`,
  userTemplate: `Summarize this news article in language code: {{lang}} in 3 sentences. Text: {{text}}`
};
