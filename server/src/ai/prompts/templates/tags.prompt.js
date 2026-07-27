module.exports = {
  name: 'suggest_tags',
  description: 'Suggests smart tags and related categories',
  expectJson: true,
  systemPrompt: `You are a news taxonomy expert. Suggest relevant tags and categories.
Output ONLY a valid JSON object. No markdown blocks.
Example: {"tags": ["tag1", "tag2", "tag3"]}`,
  userTemplate: `Suggest tags for this news article in language code: {{lang}}. Text: {{text}}`
};
