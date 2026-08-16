const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const devanagariRegex = /[\u0900-\u097F]/;

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
];

function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function translateChunkWithRetry(text, from = 'hi', to = 'bn', retries = 3) {
  if (!text || !text.trim() || !devanagariRegex.test(text)) return text;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': getRandomUserAgent(),
          'Accept': '*/*',
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json && json[0] && Array.isArray(json[0])) {
          const result = json[0].map((item) => item[0]).join('');
          if (result && result.trim()) return result;
        }
      }
    } catch (err) {
      // Retry after small delay
    }
    await delay(300 * attempt);
  }
  return text;
}

async function translateHtmlContent(html, from = 'hi', to = 'bn') {
  if (!html || !devanagariRegex.test(html)) return html;

  // Split HTML string by HTML tags to isolate text nodes
  const parts = html.split(/(<[^>]+>)/g);
  const translatedParts = [];

  for (const part of parts) {
    if (part.startsWith('<') && part.endsWith('>')) {
      // Keep HTML tag unchanged
      translatedParts.push(part);
    } else if (part.trim() && devanagariRegex.test(part)) {
      const translated = await translateChunkWithRetry(part, from, to);
      translatedParts.push(translated);
    } else {
      translatedParts.push(part);
    }
  }

  return translatedParts.join('');
}

async function startComprehensiveTranslation() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find();
  console.log(`🚀 Comprehensive Multilingual Translation starting for ${articles.length} articles...`);

  let updatedCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    let modified = false;

    // 1. Check Bengali (bn) translation
    const bnData = art.translations.get('bn') || art.translations.bn || {};
    if (devanagariRegex.test(bnData.title || '') || devanagariRegex.test(bnData.excerpt || '') || devanagariRegex.test(bnData.content || '')) {
      if (devanagariRegex.test(bnData.title || '')) {
        bnData.title = await translateChunkWithRetry(bnData.title, 'hi', 'bn');
      }
      if (devanagariRegex.test(bnData.excerpt || '')) {
        bnData.excerpt = await translateChunkWithRetry(bnData.excerpt, 'hi', 'bn');
      }
      if (devanagariRegex.test(bnData.content || '')) {
        bnData.content = await translateHtmlContent(bnData.content, 'hi', 'bn');
      }
      art.translations.set('bn', bnData);
      modified = true;
    }

    // 2. Check English (en) translation
    const enData = art.translations.get('en') || art.translations.en || {};
    if (devanagariRegex.test(enData.title || '') || devanagariRegex.test(enData.excerpt || '') || devanagariRegex.test(enData.content || '')) {
      if (devanagariRegex.test(enData.title || '')) {
        enData.title = await translateChunkWithRetry(enData.title, 'hi', 'en');
      }
      if (devanagariRegex.test(enData.excerpt || '')) {
        enData.excerpt = await translateChunkWithRetry(enData.excerpt, 'hi', 'en');
      }
      if (devanagariRegex.test(enData.content || '')) {
        enData.content = await translateHtmlContent(enData.content, 'hi', 'en');
      }
      art.translations.set('en', enData);
      modified = true;
    }

    if (modified) {
      art.markModified('translations');
      await art.save();
      updatedCount++;
      if (updatedCount % 25 === 0 || updatedCount === 1) {
        console.log(`✅ [${updatedCount}/${articles.length}] Article "${art._id}" translated to Bengali & English cleanly.`);
      }
    }
  }

  console.log(`\n🎉 Comprehensive Translation Complete! ${updatedCount} articles updated with clean Bengali & English text.`);
  await mongoose.disconnect();
}

startComprehensiveTranslation();
