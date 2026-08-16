const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const devanagariRegex = /[\u0900-\u097F]/;

async function translateChunk(text, from = 'hi', to = 'bn') {
  if (!text || !text.trim() || !devanagariRegex.test(text)) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json && json[0]) {
      return json[0].map(item => item[0]).join('');
    }
  } catch (err) {}
  return text;
}

async function translateHtmlContent(html) {
  if (!html || !devanagariRegex.test(html)) return html;
  const parts = html.split(/(<[^>]+>)/g);
  const translatedParts = [];
  for (const part of parts) {
    if (part.startsWith('<') && part.endsWith('>')) {
      translatedParts.push(part);
    } else if (part.trim() && devanagariRegex.test(part)) {
      const translated = await translateChunk(part, 'hi', 'bn');
      translatedParts.push(translated);
    } else {
      translatedParts.push(part);
    }
  }
  return translatedParts.join('');
}

async function translateYouthDayArticle() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const article = await Article.findById('6a81412ff533fc086761e54d');
  if (article) {
    console.log("Translating International Youth Day article...");
    const bnData = article.translations.get('bn') || article.translations.bn || {};
    
    bnData.title = await translateChunk(bnData.title, 'hi', 'bn');
    bnData.excerpt = await translateChunk(bnData.excerpt, 'hi', 'bn');
    bnData.content = await translateHtmlContent(bnData.content);

    article.translations.set('bn', bnData);
    article.authorName = 'Abdul Haque';
    article.markModified('translations');
    await article.save();
    console.log("✅ Youth Day Article translated to Bengali successfully!");
    console.log("NEW BN CONTENT PREVIEW:", bnData.content.slice(0, 350));
  }

  await mongoose.disconnect();
}

translateYouthDayArticle();
