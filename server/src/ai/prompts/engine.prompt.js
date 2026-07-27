const path = require('path');
const fs = require('fs');

class PromptEngine {
  constructor() {
    this.prompts = new Map();
    this.loadPrompts();
  }

  loadPrompts() {
    const templatesDir = path.join(__dirname, 'templates');
    if (!fs.existsSync(templatesDir)) return;

    const files = fs.readdirSync(templatesDir);
    for (const file of files) {
      if (file.endsWith('.prompt.js')) {
        const promptTemplate = require(path.join(templatesDir, file));
        if (promptTemplate && promptTemplate.name) {
          this.prompts.set(promptTemplate.name, promptTemplate);
        }
      }
    }
    console.log(`Loaded ${this.prompts.size} AI Prompt Templates.`);
  }

  getPrompt(name) {
    const template = this.prompts.get(name);
    if (!template) {
      throw new Error(`Prompt template '${name}' not found in registry.`);
    }
    return template;
  }
}

module.exports = new PromptEngine();
