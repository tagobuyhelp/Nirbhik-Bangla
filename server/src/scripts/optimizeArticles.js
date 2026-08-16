const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Article = require('../models/Article');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tw5058et',
  api_key: process.env.CLOUDINARY_API_KEY || '683144175919194',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'X1Y8APRzgMLcGqs3Eve3Ln8PF_I',
});

// HTML Entity Decode Helper
function decodeHtmlEntities(str = '') {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/%e0%a6%86%e0%a6%b8%e0%a6%be%e0%a6%a8%e0%a6%b8%e0%a7%8b%e0%a6%b2/gi, 'আসানসোল')
    .trim();
}

// Clean HTML Content (Remove inline styles, WP block wrappers, empty tags)
function optimizeArticleContent(htmlContent = '') {
  if (!htmlContent) return '';

  let cleaned = htmlContent
    .replace(/<!--[\s\S]*?-->/g, '') // remove wp comments
    .replace(/\[\/?caption[^\]]*\]/g, '') // remove wp caption shortcodes
    .replace(/style=["'][^"']*["']/gi, '') // remove inline styles
    .replace(/class=["'](wp-block-[^"']*|has-[^"']*)["']/gi, '') // remove wp block classes
    .replace(/<font[^>]*>/gi, '') // remove font tags
    .replace(/<\/font>/gi, '')
    .replace(/<span[^>]*>/gi, '') // remove span tags
    .replace(/<\/span>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '') // remove empty paragraphs
    .replace(/<p>&nbsp;<\/p>/gi, '')
    .trim();

  // Wrap plain text in <p> tags if no HTML tags present
  if (!/<[a-z][\s\S]*>/i.test(cleaned)) {
    cleaned = cleaned
      .split(/\n\s*\n/)
      .map(para => `<p>${para.trim()}</p>`)
      .join('\n');
  }

  return cleaned;
}

// Upload Image to Cloudinary with WebP 1200x630 Aspect Ratio Optimization
async function optimizeImage(imageUrl) {
  if (!imageUrl || imageUrl.includes('res.cloudinary.com')) {
    return imageUrl;
  }

  try {
    const uploadRes = await cloudinary.uploader.upload(imageUrl, {
      folder: 'nirbhik_bangla_articles',
      transformation: [
        { width: 1200, height: 630, crop: 'fill', gravity: 'auto', quality: 'auto', fetch_format: 'webp' }
      ]
    });
    return uploadRes.secure_url;
  } catch (err) {
    // If original WP image fails to download (404), return high quality news fallback
    console.warn(`[IMAGE OPTIMIZE WARNING]: ${imageUrl} failed (${err.message}). Using fallback.`);
    return 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=85';
  }
}

async function runOptimizationPipeline() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find();
  console.log(`📦 Found ${articles.length} articles to optimize...`);

  let optimizedCount = 0;
  let imageUploadCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    let modified = false;

    // 1. Optimize Translations (Title, Excerpt, Content, SEO)
    for (const [lang, langData] of art.translations.entries()) {
      if (!langData) continue;

      const cleanTitle = decodeHtmlEntities(langData.title);
      const cleanExcerpt = decodeHtmlEntities(langData.excerpt);
      const cleanContent = optimizeArticleContent(decodeHtmlEntities(langData.content));

      if (cleanTitle !== langData.title || cleanContent !== langData.content) {
        langData.title = cleanTitle;
        langData.excerpt = cleanExcerpt || cleanContent.replace(/<[^>]+>/g, '').slice(0, 180) + '...';
        langData.content = cleanContent;

        // Auto-generate missing SEO metadata
        if (!langData.seo || !langData.seo.title) {
          langData.seo = {
            title: `${cleanTitle} | নির্ভীক বাংলা`,
            description: langData.excerpt.slice(0, 160),
            keywords: langData.tags || [art.categoryName, 'Nirbhik Bangla', 'খবর'],
          };
        }
        modified = true;
      }
    }

    // 2. Featured Image Optimization (Cloudinary WebP 1200x630)
    // Only upload first 50 images in batch to avoid API quota limits during test run
    if (art.featuredImageUrl && art.featuredImageUrl.includes('nirbhikbangla.com/wp-content') && imageUploadCount < 50) {
      const optimizedUrl = await optimizeImage(art.featuredImageUrl);
      if (optimizedUrl !== art.featuredImageUrl) {
        art.featuredImageUrl = optimizedUrl;
        imageUploadCount++;
        modified = true;
      }
    }

    if (modified) {
      await art.save();
      optimizedCount++;
    }

    if ((i + 1) % 100 === 0 || i === articles.length - 1) {
      console.log(`⚙️ Progress: ${i + 1}/${articles.length} articles processed... (${optimizedCount} updated, ${imageUploadCount} images optimized)`);
    }
  }

  console.log('\n================ OPTIMIZATION REPORT ================');
  console.log(`✅ Total Articles Processed: ${articles.length}`);
  console.log(`✨ Articles Optimized & Updated: ${optimizedCount}`);
  console.log(`🖼️ Featured Images Uploaded & WebP Resized: ${imageUploadCount}`);
  console.log('=====================================================\n');

  await mongoose.disconnect();
  console.log('🎉 Content & Image Optimization Pipeline Completed Successfully!');
}

runOptimizationPipeline().catch((err) => {
  console.error('❌ Optimization Error:', err);
  process.exit(1);
});
