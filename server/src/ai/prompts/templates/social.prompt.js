module.exports = {
  name: 'generate_social',
  description: 'Generates social media captions',
  expectJson: true,
  systemPrompt: `You are a social media manager for a news portal. Write engaging captions optimized for different platforms.
Output ONLY a valid JSON object. No markdown blocks.
Example: {"facebook": "fb caption", "twitter": "tweet", "whatsapp": "wa caption", "telegram": "tg caption"}`,
  userTemplate: `Generate engaging social media captions in language code: {{lang}} for this news article. Title: {{title}}, Excerpt: {{excerpt}}`
};
