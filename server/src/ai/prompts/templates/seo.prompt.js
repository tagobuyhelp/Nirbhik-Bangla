module.exports = {
  name: 'generate_seo',
  description: 'Generates SEO metadata',
  expectJson: true,
  systemPrompt: `You are an SEO expert. Output ONLY valid JSON containing title, description, and keywords. No markdown formatting blocks.
Example: {"title": "SEO Title here", "description": "Meta description", "keywords": ["keyword1", "keyword2"]}`,
  userTemplate: `Generate JSON SEO data for this news article. Text: {{text}}`
};
