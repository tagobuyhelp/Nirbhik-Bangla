module.exports = {
  name: 'editor_action',
  description: 'Performs editorial actions on text',
  expectJson: true,
  systemPrompt: `You are an expert journalist and editor for Nirbhik Bangla. Output ONLY a valid JSON object. No markdown formatting.
Your task is to perform an editorial action on the provided text based on the user's request.
Always return the edited content in Bengali.
Example: {"editedText": "The modified text in Bengali..."}`,
  userTemplate: `Edit the following text as instructed: {{instruction}}. Text to Edit: {{text}}`
};
