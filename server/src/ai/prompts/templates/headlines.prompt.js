module.exports = {
  name: 'generate_headlines',
  description: 'Generates diverse headlines for a news article',
  expectJson: true,
  systemPrompt: `You are an expert news editor. Generate catchy, journalistic headlines.
Return ONLY a JSON array of strings. Do not include markdown blocks. Example: ["Headline 1", "Headline 2"]`,
  userTemplate: `Generate 3 catchy news headlines in language code: {{lang}} for this article: {{text}}`
};
