const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Article = require('../models/Article');

const devanagariRegex = /[\u0900-\u097F]/;

async function translateTextChunk(text, from = 'hi', to = 'bn') {
  if (!text || !text.trim() || !devanagariRegex.test(text)) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json && json[0]) {
      return json[0].map(item => item[0]).join('');
    }
  } catch (err) {
    console.error('Translation error for chunk:', err.message);
  }
  return text;
}

async function translateHtmlContent(html) {
  if (!html || !devanagariRegex.test(html)) return html;

  // Split by HTML tags preserving tags
  const parts = html.split(/(<[^>]+>)/g);
  const translatedParts = [];

  for (const part of parts) {
    if (part.startsWith('<') && part.endsWith('>')) {
      // It's an HTML tag (e.g., <p>, <img ...>, <br>, etc.) - leave untouched!
      translatedParts.push(part);
    } else if (part.trim() && devanagariRegex.test(part)) {
      // Text node containing Hindi Devanagari text - translate to Bengali!
      const translated = await translateTextChunk(part, 'hi', 'bn');
      translatedParts.push(translated);
    } else {
      translatedParts.push(part);
    }
  }

  return translatedParts.join('');
}

async function runTranslationPipeline() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find();
  console.log(`🚀 Starting Full Bengali Content Translation for ${articles.length} articles...`);

  let updatedCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    let modified = false;

    // Get current translations map
    const bnData = art.translations.get('bn') || art.translations.bn || {};
    const hiData = art.translations.get('hi') || art.translations.hi || {};

    let currentBnContent = bnData.content || hiData.content || '';

    if (devanagariRegex.test(currentBnContent)) {
      const newBengaliContent = await translateHtmlContent(currentBnContent);
      
      // Update bn translation content
      bnData.content = newBengaliContent;
      art.translations.set('bn', bnData);
      modified = true;
    }

    if (modified) {
      art.markModified('translations');
      await art.save();
      updatedCount++;
      if (updatedCount % 50 === 0 || updatedCount === 1) {
        console.log(`✅ [${updatedCount}/${articles.length}] Translated article "${art._id}" full content to Bengali.`);
      }
    }
  }

  console.log(`\n🎉 Translation Pipeline Completed! ${updatedCount} articles updated with full Bengali content.`);
  await mongoose.disconnect();
}

runTranslationPipeline();
