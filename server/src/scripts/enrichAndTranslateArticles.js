const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Article = require('../models/Article');

// Common Bengali/Hindi to English word mapping dictionary for clean SEO URL slugs
const DICTIONARY = {
  'আসানসোল': 'asansol',
  'দুর্গাপুর': 'durgapur',
  'পশ্চিম': 'paschim',
  'বর্ধমান': 'bardhaman',
  'কলকাতা': 'kolkata',
  'বাংলাদেশ': 'bangladesh',
  'ভারত': 'india',
  'রাজনীতি': 'politics',
  'খেলা': 'sports',
  'বিনোদন': 'entertainment',
  'ব্যবসা': 'business',
  'বাজেট': 'budget',
  'নির্বাচন': 'election',
  'ভোট': 'vote',
  'সরকার': 'government',
  'পুলিশ': 'police',
  'দুর্ঘটনা': 'accident',
  'বৃষ্টি': 'rain',
  'আবহাওয়া': 'weather',
  'স্বাস্থ্য': 'health',
  'চাকরি': 'job',
  'শিক্ষা': 'education',
  'করোনা': 'corona',
  'ভাইরাস': 'virus',
  'আদালত': 'court',
  'হাইকোর্ট': 'high-court',
  'সুপ্রিম কোর্ট': 'supreme-court',
  'তৃণমূল': 'tmc',
  'বিজেপি': 'bjp',
  'সিপিএম': 'cpm',
  'কংগ্রেস': 'congress',
  'মমতা': 'mamata',
  'মোদী': 'modi',
  'অভিষেক': 'abhishek',
};

function slugify(text = '') {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateCleanEnglishSlug(title = '', originalSlug = '', id = '') {
  // 1. If original slug is already clean ASCII English
  if (originalSlug && /^[a-z0-9-]+$/.test(originalSlug) && originalSlug.length > 3) {
    return originalSlug;
  }

  // 2. Check if title contains English words
  const latinMatches = title.match(/[a-zA-Z0-9\s-]+/g);
  if (latinMatches && latinMatches.join(' ').trim().length > 4) {
    const s = slugify(latinMatches.join(' '));
    if (s.length > 3) return s;
  }

  // 3. Dictionary translation matching
  let slugWords = [];
  for (const [key, val] of Object.entries(DICTIONARY)) {
    if (title.includes(key)) {
      slugWords.push(val);
    }
  }

  if (slugWords.length > 0) {
    const base = slugWords.join('-');
    const shortId = id.toString().slice(-6);
    return `${base}-update-${shortId}`;
  }

  // 4. Guaranteed clean unique English fallback slug using ID
  const shortId = id.toString().slice(-8);
  return `nirbhik-bangla-news-${shortId}`;
}

async function runEnrichmentPipeline() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find();
  console.log(`📦 Enriching ${articles.length} articles with clean English SEO slugs, Multilingual metadata, and Alt texts...`);

  let updatedCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    let modified = false;

    const origLang = art.originalLanguage || art.defaultLanguage || 'bn';
    const primaryData = art.translations.get(origLang) || art.translations.get('bn') || art.translations.get('hi') || {};

    if (!primaryData.title) continue;

    const baseTitle = primaryData.title;
    const baseExcerpt = primaryData.excerpt || primaryData.content?.replace(/<[^>]+>/g, '').slice(0, 180) + '...';
    const baseContent = primaryData.content || `<p>${baseTitle}</p>`;

    // 1. Generate Clean SEO English Slug
    const cleanEnSlug = generateCleanEnglishSlug(baseTitle, art.translations.get('en')?.slug || art.slug, art._id);

    // 2. Ensure all 3 languages (bn, en, hi) exist in translations Map
    const langs = ['bn', 'en', 'hi'];

    for (const lang of langs) {
      let langData = art.translations.get(lang);

      if (!langData || !langData.title) {
        langData = {
          title: baseTitle,
          slug: lang === 'en' ? cleanEnSlug : `${cleanEnSlug}-${lang}`,
          excerpt: baseExcerpt,
          content: baseContent,
          tags: art.tags || [],
          status: 'published',
          publishedAt: art.publishedAt || art.createdAt || Date.now(),
          seo: {
            title: `${baseTitle} | Nirbhik Bangla`,
            description: baseExcerpt.slice(0, 160),
            keywords: art.tags && art.tags.length > 0 ? art.tags : [art.categoryName, 'Nirbhik Bangla', 'News'],
          }
        };
        art.translations.set(lang, langData);
        modified = true;
      } else {
        // Ensure slug is clean ASCII
        if (lang === 'en' && (!langData.slug || !/^[a-z0-9-]+$/.test(langData.slug))) {
          langData.slug = cleanEnSlug;
          modified = true;
        }
        if (!langData.seo || !langData.seo.title) {
          langData.seo = {
            title: `${langData.title} | Nirbhik Bangla`,
            description: (langData.excerpt || langData.title).slice(0, 160),
            keywords: langData.tags || [art.categoryName, 'Nirbhik Bangla', 'News'],
          };
          modified = true;
        }
      }
    }

    // 3. Image metadata & Author enrichment
    if (!art.imageMetadata || !art.imageMetadata.altText) {
      art.imageMetadata = {
        altText: baseTitle,
        caption: baseExcerpt.slice(0, 120),
        credit: 'Nirbhik Bangla Photo',
      };
      modified = true;
    }

    if (!art.authorName) {
      art.authorName = 'নির্ভীক বাংলা সংবাদ প্রতিনিধি';
      modified = true;
    }

    if (modified) {
      await art.save();
      updatedCount++;
    }

    if ((i + 1) % 200 === 0 || i === articles.length - 1) {
      console.log(`⚙️ Progress: ${i + 1}/${articles.length} articles enriched... (${updatedCount} updated)`);
    }
  }

  console.log('\n================ ENRICHMENT REPORT ================');
  console.log(`✅ Total Articles Evaluated: ${articles.length}`);
  console.log(`✨ Articles Enriched & Saved: ${updatedCount}`);
  console.log('===================================================\n');

  await mongoose.disconnect();
  console.log('🎉 SEO English Slugs & Multilingual Fields Enriched Successfully!');
}

runEnrichmentPipeline().catch((err) => {
  console.error('❌ Enrichment Error:', err);
  process.exit(1);
});
