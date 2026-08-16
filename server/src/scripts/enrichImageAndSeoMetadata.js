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
  if (from === 'hi' && !realHindiRegex.test(text)) return text;

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

async function startImageSeoEnrichment() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find().lean();
  console.log(`🖼️  Starting Image SEO & Metadata Translation Enrichment for ${articles.length} articles...`);

  const BATCH_SIZE = 40;
  let totalEnriched = 0;

  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    const batch = articles.slice(i, i + BATCH_SIZE);
    const bulkOps = [];

    await Promise.all(
      batch.map(async (art) => {
        const bnData = art.translations?.bn || {};
        const enData = art.translations?.en || {};
        const updateFields = {};

        const bnTitle = bnData.title || art.title || 'নির্ভীক বাংলা খবর';
        const bnExcerpt = bnData.excerpt || bnTitle;

        const enTitle = enData.title || 'Nirbhik Bangla News';
        const enExcerpt = enData.excerpt || enTitle;

        // 1. Bengali Image Metadata SEO
        let bnAltText = bnData.imageMetadata?.altText || '';
        let bnCaption = bnData.imageMetadata?.caption || '';
        let bnCredit = bnData.imageMetadata?.credit || '';

        if (realHindiRegex.test(bnAltText)) bnAltText = await translateText(bnAltText, 'hi', 'bn');
        if (realHindiRegex.test(bnCaption)) bnCaption = await translateText(bnCaption, 'hi', 'bn');
        if (realHindiRegex.test(bnCredit)) bnCredit = await translateText(bnCredit, 'hi', 'bn');

        if (!bnAltText || realHindiRegex.test(bnAltText)) {
          bnAltText = `${bnTitle} - ছবিচিত্র | নির্ভীক বাংলা`;
        }
        if (!bnCaption || realHindiRegex.test(bnCaption)) {
          bnCaption = bnExcerpt.slice(0, 140);
        }
        if (!bnCredit) {
          bnCredit = 'নির্ভীক বাংলা ফটো টিম';
        }

        updateFields['translations.bn.imageMetadata.altText'] = bnAltText;
        updateFields['translations.bn.imageMetadata.caption'] = bnCaption;
        updateFields['translations.bn.imageMetadata.credit'] = bnCredit;

        // 2. English Image Metadata SEO
        let enAltText = enData.imageMetadata?.altText || '';
        let enCaption = enData.imageMetadata?.caption || '';
        let enCredit = enData.imageMetadata?.credit || '';

        if (realHindiRegex.test(enAltText)) enAltText = await translateText(enAltText, 'hi', 'en');
        if (realHindiRegex.test(enCaption)) enCaption = await translateText(enCaption, 'hi', 'en');
        if (realHindiRegex.test(enCredit)) enCredit = await translateText(enCredit, 'hi', 'en');

        if (!enAltText || realHindiRegex.test(enAltText)) {
          enAltText = `${enTitle} - Featured Image | Nirbhik Bangla`;
        }
        if (!enCaption || realHindiRegex.test(enCaption)) {
          enCaption = enExcerpt.slice(0, 140);
        }
        if (!enCredit) {
          enCredit = 'Nirbhik Bangla Photo Coverage';
        }

        updateFields['translations.en.imageMetadata.altText'] = enAltText;
        updateFields['translations.en.imageMetadata.caption'] = enCaption;
        updateFields['translations.en.imageMetadata.credit'] = enCredit;

        // 3. Top-level article Image Metadata
        updateFields['imageMetadata.altText'] = bnAltText;
        updateFields['imageMetadata.caption'] = bnCaption;
        updateFields['imageMetadata.credit'] = bnCredit;

        // 4. SEO Titles and Descriptions
        updateFields['translations.bn.seo.title'] = `${bnTitle} | নির্ভীক বাংলা`;
        updateFields['translations.bn.seo.description'] = bnExcerpt.slice(0, 160);

        updateFields['translations.en.seo.title'] = `${enTitle} | Nirbhik Bangla`;
        updateFields['translations.en.seo.description'] = enExcerpt.slice(0, 160);

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
      totalEnriched += bulkOps.length;
      console.log(`✅ [${Math.min(i + BATCH_SIZE, articles.length)}/${articles.length}] Image SEO Enriched | Total Updated: ${totalEnriched}`);
    }
  }

  console.log(`\n🎉 Image SEO Metadata Translation & Enrichment Complete! ${totalEnriched} articles updated.`);
  await mongoose.disconnect();
}

startImageSeoEnrichment();
