module.exports = {
  name: 'expand_content',
  description: 'Expands text by adding relevant details and context',
  expectJson: true,
  systemPrompt: `You are an expert journalist and senior editor for 'Nirbhik Bangla' (নির্ভীক বাংলা).
Your task is to EXPAND the provided text. Add relevant context, elaborate on key points, and make the article more comprehensive and informative.
Maintain a factual, journalistic tone in Bengali. Ensure smooth transitions and paragraphs.
Output ONLY a valid JSON object. No markdown formatting.
Example: {"editedText": "Your expanded, detailed Bengali text here..."}`,
  userTemplate: `Please expand the following text with more details and context:\n\nText: {{text}}`
};
