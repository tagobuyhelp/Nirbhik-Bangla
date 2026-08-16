const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { XMLParser } = require('fast-xml-parser');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Article = require('../models/Article');
const Category = require('../models/Category');

// Category mapping helper
const CATEGORY_MAP = {
  'kolkata': 'rajya',
  'state': 'rajya',
  'rajya': 'rajya',
  'national': 'desh',
  'desh': 'desh',
  'world': 'biswa',
  'sports': 'khela',
  'khela': 'khela',
  'binodon': 'binodon',
  'entertainment': 'binodon',
  'business': 'business',
  'life-style': 'lifestyle',
  'lifestyle': 'lifestyle',
  'politics': 'rajya',
  'breaking': 'desh',
  'current-news': 'desh',
  'populaposts': 'desh',
  'videos': 'desh',
  'asansol': 'asansol',
  'durgapur': 'durgapur',
  'paschim-bardhaman': 'paschim-bardhaman',
};

// Language detection helper
function detectLanguage(title = '', content = '') {
  const sample = (title + ' ' + content.slice(0, 500));
  let devanagariCount = 0; // Hindi
  let bengaliCount = 0;   // Bengali

  for (let i = 0; i < sample.length; i++) {
    const code = sample.charCodeAt(i);
    if (code >= 0x0900 && code <= 0x097F) devanagariCount++;
    if (code >= 0x0980 && code <= 0x09FF) bengaliCount++;
  }

  return devanagariCount > bengaliCount ? 'hi' : 'bn';
}

function cleanHtml(htmlStr = '') {
  if (typeof htmlStr !== 'string') return '';
  return htmlStr
    .replace(/<!--[\s\S]*?-->/g, '') // remove wp comments
    .replace(/\[\/?caption[^\]]*\]/g, '') // remove wp caption shortcodes
    .trim();
}

function extractFirstImageUrl(htmlContent = '') {
  const match = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
}

function decodeCdata(val) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val['#text']) return val['#text'];
  return String(val);
}

async function runMigration() {
  const xmlPath = path.join(__dirname, '../../../old-ste-content/nirvikbangla.WordPress.2026-08-16.xml');

  if (!fs.existsSync(xmlPath)) {
    console.error(`❌ XML File not found at: ${xmlPath}`);
    process.exit(1);
  }

  console.log(`🚀 Loading & Parsing XML file (${(fs.statSync(xmlPath).size / (1024 * 1024)).toFixed(2)} MB)...`);
  const xmlData = fs.readFileSync(xmlPath, 'utf8');

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseAttributeValue: true,
  });

  const parsed = parser.parse(xmlData);
  const channel = parsed.rss?.channel;
  if (!channel || !channel.item) {
    console.error('❌ Invalid WXR XML format or empty channel items.');
    process.exit(1);
  }

  const items = Array.isArray(channel.item) ? channel.item : [channel.item];
  console.log(`📦 Total Items Found in XML: ${items.length}`);

  // 1. Build Attachment Map (post_id -> image_url)
  const attachmentMap = new Map();
  items.forEach((item) => {
    const postType = decodeCdata(item['wp:post_type']);
    const postId = decodeCdata(item['wp:post_id']);
    const attachmentUrl = decodeCdata(item['wp:attachment_url']) || decodeCdata(item.guid);

    if (postType === 'attachment' && postId && attachmentUrl) {
      attachmentMap.set(String(postId), attachmentUrl);
    }
  });

  console.log(`🖼️ Total Attachments Mapped: ${attachmentMap.size}`);

  // Connect to MongoDB
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const isDryRun = process.env.DRY_RUN === 'true';
  if (isDryRun) console.log('⚠️ Running in DRY RUN mode (no database writes)...');

  let insertedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  let bnCount = 0;
  let hiCount = 0;

  // 2. Filter & Process Posts
  for (const item of items) {
    const postType = decodeCdata(item['wp:post_type']);
    const postStatus = decodeCdata(item['wp:status']);

    if (postType !== 'post' || postStatus !== 'publish') {
      continue;
    }

    const title = decodeCdata(item.title).trim();
    if (!title) continue;

    const rawContent = decodeCdata(item['content:encoded']);
    const content = cleanHtml(rawContent);
    const rawExcerpt = decodeCdata(item['excerpt:encoded']);
    const excerpt = cleanHtml(rawExcerpt) || content.replace(/<[^>]+>/g, '').slice(0, 180) + '...';

    let slug = decodeCdata(item['wp:post_name']);
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    const pubDateStr = decodeCdata(item['wp:post_date']) || decodeCdata(item.pubDate);
    const publishedAt = pubDateStr ? new Date(pubDateStr) : new Date();

    // Featured Image lookup
    let featuredImageUrl = '';
    const postMetaList = item['wp:postmeta'];
    if (Array.isArray(postMetaList)) {
      const thumbMeta = postMetaList.find(m => decodeCdata(m['wp:meta_key']) === '_thumbnail_id');
      if (thumbMeta) {
        const thumbId = decodeCdata(thumbMeta['wp:meta_value']);
        featuredImageUrl = attachmentMap.get(String(thumbId)) || '';
      }
    }
    if (!featuredImageUrl) {
      featuredImageUrl = extractFirstImageUrl(rawContent);
    }

    // Categories & Tags
    let primaryCategorySlug = 'desh';
    let primaryCategoryName = 'দেশ';
    const tagList = [];

    const categoriesRaw = item.category;
    if (categoriesRaw) {
      const catArray = Array.isArray(categoriesRaw) ? categoriesRaw : [categoriesRaw];
      catArray.forEach((catObj) => {
        const domain = catObj['@_domain'];
        const catSlug = catObj['@_nicename'] || '';
        const catName = decodeCdata(catObj);

        if (domain === 'category' && catSlug) {
          const mapped = CATEGORY_MAP[catSlug.toLowerCase()];
          if (mapped) {
            primaryCategorySlug = mapped;
            primaryCategoryName = catName || mapped;
          }
        } else if (domain === 'post_tag' && catName) {
          tagList.push(catName);
        }
      });
    }

    // Language detection
    const lang = detectLanguage(title, content);
    if (lang === 'hi') hiCount++; else bnCount++;

    const isBreaking = primaryCategorySlug === 'breaking';

    const translationData = {
      title,
      slug,
      excerpt,
      content,
      tags: tagList,
      status: 'published',
      publishedAt,
    };

    const translationsMap = new Map();
    translationsMap.set(lang, translationData);

    if (isDryRun) {
      insertedCount++;
      continue;
    }

    // Database upsert by slug
    const existing = await Article.findOne({
      $or: [
        { 'translations.bn.slug': slug },
        { 'translations.hi.slug': slug },
        { 'translations.en.slug': slug },
      ]
    });

    if (existing) {
      existing.translations.set(lang, translationData);
      if (featuredImageUrl && !existing.featuredImageUrl) {
        existing.featuredImageUrl = featuredImageUrl;
      }
      await existing.save();
      updatedCount++;
    } else {
      await Article.create({
        defaultLanguage: lang,
        originalLanguage: lang,
        translations: translationsMap,
        categorySlug: primaryCategorySlug,
        categoryName: primaryCategoryName,
        tags: tagList,
        featuredImageUrl,
        isBreaking,
        authorName: decodeCdata(item['dc:creator']) || 'নির্ভীক বাংলা সংবাদ প্রতিনিধি',
        publishedAt,
      });
      insertedCount++;
    }
  }

  console.log('\n================ MIGRATION REPORT ================');
  console.log(`✅ Total Articles Processed: ${insertedCount + updatedCount + skippedCount}`);
  console.log(`📥 Newly Inserted: ${insertedCount}`);
  console.log(`🔄 Updated Existing: ${updatedCount}`);
  console.log(`🇧🇩 Bengali Articles: ${bnCount}`);
  console.log(`🇮🇳 Hindi Articles: ${hiCount}`);
  console.log('==================================================\n');

  await mongoose.disconnect();
  console.log('🎉 Migration Completed Successfully!');
}

runMigration().catch((err) => {
  console.error('❌ Migration Error:', err);
  process.exit(1);
});
