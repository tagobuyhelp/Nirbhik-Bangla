module.exports = {
  name: 'generate_seo',
  description: 'Generates SEO metadata',
  expectJson: true,
  systemPrompt: `You are an expert News & Video SEO Specialist. Output ONLY a valid JSON object with fields: seoTitle, seoDescription, slug, keywords (array of 5 strings), altText. No markdown formatting.
Example: {"seoTitle": "Catchy SEO Title | Nirbhik Bangla", "seoDescription": "Engaging meta description under 160 chars.", "slug": "catchy-seo-title", "keywords": ["keyword1", "keyword2"], "altText": "Descriptive image alt text"}`,
  userTemplate: `Generate optimized SEO metadata for this video in language: {{lang}}. Title: {{title}}, Description: {{description}}`
};
