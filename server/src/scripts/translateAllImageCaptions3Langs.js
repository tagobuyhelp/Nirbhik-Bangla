const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const realHindiRegex = /[\u0904-\u0939\u093D-\u0950\u0958-\u0963]/;

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
];

function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function translateText(text, from = 'hi', to = 'bn', retries = 3) {
  if (!text || !text.trim()) return text;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
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

async function start3LanguageCaptionMigration() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find().lean();
  console.log(`📸 Starting 3-Language Image Caption Migration for ${articles.length} articles...`);

  const BATCH_SIZE = 40;
  let totalUpdated = 0;

  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    const batch = articles.slice(i, i + BATCH_SIZE);
    const bulkOps = [];

    await Promise.all(
      batch.map(async (art) => {
        const bnData = art.translations?.bn || {};
        const enData = art.translations?.en || {};
        const hiData = art.translations?.hi || {};
        const updateFields = {};

        const bnTitle = bnData.title || art.title || 'নির্ভীক বাংলা খবর';
        const bnExcerpt = bnData.excerpt || bnTitle;

        const enTitle = enData.title || 'Nirbhik Bangla News';
        const enExcerpt = enData.excerpt || enTitle;

        const hiTitle = hiData.title || 'निर्भीक बांग्ला समाचार';
        const hiExcerpt = hiData.excerpt || hiTitle;

        // 1. Bengali Caption (bn)
        let bnCap = bnData.imageMetadata?.caption || '';
        if (realHindiRegex.test(bnCap)) bnCap = await translateText(bnCap, 'hi', 'bn');
        if (!bnCap.trim()) bnCap = `${bnExcerpt.slice(0, 120)} — বিস্তারিত প্রতিবেদন নির্ভীক বাংলায় পড়ুন।`;

        updateFields['translations.bn.imageMetadata.caption'] = bnCap;
        updateFields['translations.bn.imageMetadata.altText'] = `${bnTitle} - চিত্র | নির্ভীক বাংলা`;
        updateFields['translations.bn.imageMetadata.credit'] = 'নির্ভীক বাংলা ফটো';

        // 2. English Caption (en)
        let enCap = enData.imageMetadata?.caption || '';
        if (realHindiRegex.test(enCap)) enCap = await translateText(enCap, 'hi', 'en');
        if (!enCap.trim() || realHindiRegex.test(enCap)) enCap = `Read detailed report on ${enTitle} on Nirbhik Bangla.`;

        updateFields['translations.en.imageMetadata.caption'] = enCap;
        updateFields['translations.en.imageMetadata.altText'] = `${enTitle} - Featured Photo | Nirbhik Bangla`;
        updateFields['translations.en.imageMetadata.credit'] = 'Nirbhik Bangla Photo';

        // 3. Hindi Caption (hi)
        let hiCap = hiData.imageMetadata?.caption || '';
        if (!hiCap.trim() || !realHindiRegex.test(hiCap)) {
          if (realHindiRegex.test(hiExcerpt)) {
            hiCap = `${hiExcerpt.slice(0, 120)} — विस्तृत समाचार पढ़ें निर्भीक बांग्ला पर।`;
          } else {
            hiCap = await translateText(bnCap, 'bn', 'hi');
          }
        }

        updateFields['translations.hi.imageMetadata.caption'] = hiCap;
        updateFields['translations.hi.imageMetadata.altText'] = `${hiTitle} - फोटो | निर्भीक बांग्ला`;
        updateFields['translations.hi.imageMetadata.credit'] = 'निर्भीक बांग्ला फोटो';

        // 4. Top-level Default
        updateFields['imageMetadata.caption'] = bnCap;
        updateFields['imageMetadata.altText'] = `${bnTitle} - চিত্র | নির্ভীক বাংলা`;
        updateFields['imageMetadata.credit'] = 'নির্ভীক বাংলা ফটো';

        bulkOps.push({
          updateOne: {
            filter: { _id: art._id },
            update: { $set: updateFields },
          },
        });
      })
    );

    if (bulkOps.length > 0) {
      await Article.bulkWrite(bulkOps);
      totalUpdated += bulkOps.length;
      console.log(`✅ [${Math.min(i + BATCH_SIZE, articles.length)}/${articles.length}] Captions Enriched in BN, EN, HI | Total Updated: ${totalUpdated}`);
    }
  }

  console.log(`\n🎉 3-Language Image Caption Migration Complete! ${totalUpdated} articles updated.`);
  await mongoose.disconnect();
}

start3LanguageCaptionMigration();
