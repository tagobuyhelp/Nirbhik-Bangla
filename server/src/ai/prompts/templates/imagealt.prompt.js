module.exports = {
  name: 'generate_image_alt',
  description: 'Generates image alt text, caption, and credit in requested language',
  expectJson: true,
  systemPrompt: `You are an expert SEO specialist and image metadata generator for Nirbhik Bangla. Output ONLY a valid JSON object. No markdown formatting.
Generate image alt text, caption, and credit based on the provided article title and excerpt.
1. The alt text should be descriptive for accessibility and SEO in the requested language ({{lang}}).
2. The caption should be an engaging one-liner in the requested language ({{lang}}).
3. The credit should default to "Nirbhik Bangla Photo".
Output format MUST be strictly a JSON object: {"altText": "Text in {{lang}}", "caption": "Caption in {{lang}}", "credit": "Nirbhik Bangla Photo"}`,
  userTemplate: `Generate image metadata in language: {{lang}}. Title: {{title}} Excerpt: {{excerpt}}`
};
