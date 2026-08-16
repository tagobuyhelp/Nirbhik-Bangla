const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const DICTIONARY = {
  'আসানসোল': 'asansol', 'आसनसोल': 'asansol',
  'দুর্গাপুর': 'durgapur', 'दुर्गापुर': 'durgapur',
  'পশ্চিম': 'paschim', 'पश्चिम': 'paschim',
  'বর্ধমান': 'bardhaman', 'बर्धमान': 'bardhaman',
  'কলকাতা': 'kolkata', 'कोलकाता': 'kolkata',
  'বাংলাদেশ': 'bangladesh', 'बांग्लादेश': 'bangladesh',
  'ভারত': 'india', 'भारत': 'india',
  'রাজনীতি': 'politics', 'राजनीति': 'politics',
  'খেলা': 'sports', 'खेल': 'sports',
  'বিনোদন': 'entertainment', 'मनोरंजन': 'entertainment',
  'ব্যবসা': 'business', 'व्यापार': 'business',
  'বাজেট': 'budget', 'बजट': 'budget',
  'নির্বাচন': 'election', 'चुनाव': 'election',
  'ভোট': 'vote', 'वोट': 'vote',
  'সরকার': 'government', 'सरकार': 'government',
  'পুলিশ': 'police', 'पुलिस': 'police',
  'দুর্ঘটনা': 'accident', 'दुर्घटना': 'accident',
  'স্বাস্থ্য': 'health', 'स्वास्थ्य': 'health',
  'চাকরি': 'job', 'नौकरी': 'job',
  'শিক্ষা': 'education', 'शिक्षा': 'education',
  'আদালত': 'court', 'अदालत': 'court',
  'হাইকোর্ট': 'high-court', 'हाईकोर्ट': 'high-court',
  'সুপ্রিম কোর্ট': 'supreme-court', 'सुप्रीम कोर्ट': 'supreme-court',
  'তৃণমূল': 'tmc', 'तृणमूल': 'tmc',
  'বিজেপি': 'bjp', 'भाजपा': 'bjp',
  'সিপিএম': 'cpm', 'सीपीआईएम': 'cpm',
  'কংগ্রেস': 'congress', 'कांग्रेस': 'congress',
  'মমতা': 'mamata', 'ममता': 'mamata',
  'মোদী': 'modi', 'मोदी': 'modi',
  'অভিষেক': 'abhishek', 'अभिषेक': 'abhishek',
  'শুভেন্দু': 'suvendu', 'शुभेंदु': 'suvendu',
  'মালিক': 'malik', 'माफिया': 'mafia',
  'কয়লা': 'coal', 'कोयला': 'coal',
  'বালি': 'sand', 'बालू': 'sand',
  'সাইকেল': 'cycle', 'साइइकिल': 'cycle',
  'বিএসএফ': 'bsf', 'बीएसएफ': 'bsf',
  'যুব': 'youth', 'युवा': 'youth',
  'দিবস': 'day', 'दिवस': 'day',
  'হাসপাতাল': 'hospital', 'अस्पताल': 'hospital',
  'স্কুল': 'school', 'स्कूल': 'school',
  'রেলওয়ে': 'railway', 'रेलवे': 'railway',
  'ট্রেন': 'train', 'ट्रेन': 'train',
  'থানা': 'police-station', 'थाना': 'police-station',
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

function generateCleanSeoSlug(title = '', originalSlug = '', id = '') {
  let cleanOriginal = (originalSlug || '')
    .replace(/-(en|bn|hi)$/i, '')
    .replace(/%[0-9a-f]{2}/gi, '')
    .replace(/news-article-[a-z0-9-]+/gi, '')
    .trim();

  cleanOriginal = slugify(cleanOriginal);

  // If cleanOriginal is already a good English slug (between 10 and 65 chars)
  if (cleanOriginal && /^[a-z0-9-]+$/.test(cleanOriginal) && cleanOriginal.length >= 10 && cleanOriginal.length <= 65) {
    return cleanOriginal;
  }

  // If title contains English letters, extract them
  const latinMatches = title.match(/[a-z0-9\s-]+/gi);
  if (latinMatches && latinMatches.join(' ').trim().length > 8) {
    const s = slugify(latinMatches.join(' '));
    if (s.length >= 8 && s.length <= 65) return s;
  }

  // Dictionary keyword extraction
  let keywords = [];
  for (const [key, val] of Object.entries(DICTIONARY)) {
    if (title.includes(key)) {
      if (!keywords.includes(val)) keywords.push(val);
    }
  }

  if (keywords.length > 0) {
    const base = keywords.slice(0, 5).join('-');
    const shortId = id.toString().slice(-6);
    return slugify(`${base}-news-${shortId}`);
  }

  // Fallback using ID
  const shortId = id.toString().slice(-8);
  return `nirbhik-bangla-news-${shortId}`;
}

async function testSlugGeneration() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const sampleArticles = await Article.find().limit(8).lean();
  console.log("=== SEO SLUG GENERATION PREVIEW ===");
  for (const art of sampleArticles) {
    const bnTitle = art.translations?.bn?.title || art.title || '';
    const enTitle = art.translations?.en?.title || '';
    const origSlug = art.translations?.bn?.slug || art.slug || '';

    const newBnSlug = generateCleanSeoSlug(bnTitle, origSlug, art._id);
    const newEnSlug = generateCleanSeoSlug(enTitle, enTitle, art._id);

    console.log("-----------------------------------------");
    console.log("Original Slug:", origSlug);
    console.log("BN Title:", bnTitle);
    console.log("New Clean BN/EN SEO Slug:", newBnSlug);
  }

  await mongoose.disconnect();
}

testSlugGeneration();
