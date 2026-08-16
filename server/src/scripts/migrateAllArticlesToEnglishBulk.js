const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

// Genuine Hindi Devanagari letters (excluding Bengali Danda । U+0964)
const realHindiRegex = /[\u0904-\u0939\u093D-\u0950\u0958-\u0963]/;

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
];

function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function translateToEnglish(text, from = 'hi', retries = 3) {
  if (!text || !text.trim() || !realHindiRegex.test(text)) return text;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=en&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': getRandomUserAgent(), 'Accept': '*/*' },
      });

      if (res.ok) {
        const json = await res.json();
        if (json && json[0] && Array.isArray(json[0])) {
          const result = json[0].map((item) => item[0]).join('');
          if (result && result.trim()) return result;
        }
      }
    } catch (err) {}
    await delay(100 * attempt);
  }
  return text;
}

async function translateHtmlContentToEnglish(html, from = 'hi') {
  if (!html || !realHindiRegex.test(html)) return html;

  const parts = html.split(/(<[^>]+>)/g);
  const translatedParts = [];

  for (const part of parts) {
    if (part.startsWith('<') && part.endsWith('>')) {
      translatedParts.push(part);
    } else if (part.trim() && realHindiRegex.test(part)) {
      const translated = await translateToEnglish(part, from);
      translatedParts.push(translated);
    } else {
      translatedParts.push(part);
    }
  }

  return translatedParts.join('');
}

async function startEnglishBulkMigration() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find().lean();
  console.log(`🇬🇧 Starting English Bulk Translation for ${articles.length} articles...`);

  const BATCH_SIZE = 25;
  let totalUpdated = 0;

  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    const batch = articles.slice(i, i + BATCH_SIZE);
    const bulkOps = [];

    await Promise.all(
      batch.map(async (art) => {
        const enData = art.translations?.en || {};
        const hiData = art.translations?.hi || {};
        const updateFields = {};

        // Translate English Title
        let currentTitle = enData.title || hiData.title || art.title || '';
        if (realHindiRegex.test(currentTitle)) {
          updateFields['translations.en.title'] = await translateToEnglish(currentTitle, 'hi');
        }

        // Translate English Excerpt
        let currentExcerpt = enData.excerpt || hiData.excerpt || '';
        if (realHindiRegex.test(currentExcerpt)) {
          updateFields['translations.en.excerpt'] = await translateToEnglish(currentExcerpt, 'hi');
        }

        // Translate English Content
        let currentContent = enData.content || hiData.content || '';
        if (realHindiRegex.test(currentContent)) {
          updateFields['translations.en.content'] = await translateHtmlContentToEnglish(currentContent, 'hi');
        }

        if (Object.keys(updateFields).length > 0) {
          bulkOps.push({
            updateOne: {
              filter: { _id: art._id },
              update: { $set: updateFields },
            },
          });
        }
      })
    );

    if (bulkOps.length > 0) {
      await Article.bulkWrite(bulkOps);
      totalUpdated += bulkOps.length;
      console.log(`✅ [${Math.min(i + BATCH_SIZE, articles.length)}/${articles.length}] English batch processed | Total Updated: ${totalUpdated}`);
    }
  }

  console.log(`\n🎉 English Bulk Migration Complete! ${totalUpdated} articles permanently updated in MongoDB with clean English text.`);
  await mongoose.disconnect();
}

startEnglishBulkMigration();
