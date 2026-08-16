const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

const defaultNewsImages = [
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80'
];

async function cleanAndEnrich() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const articles = await Article.find({});
    console.log(`Initial total articles: ${articles.length}`);

    let deletedCount = 0;
    let fixedImagesCount = 0;
    let fixedTranslationsCount = 0;

    for (const art of articles) {
      const bn = art.translations?.get ? art.translations.get('bn') : art.translations?.bn;
      const title = bn?.title || '';
      const content = bn?.content || '';

      // Delete if title or content is completely missing
      if (!title.trim() || !content.trim()) {
        await Article.deleteOne({ _id: art._id });
        deletedCount++;
        continue;
      }

      let isModified = false;

      // Fix missing/broken featuredImageUrl
      if (!art.featuredImageUrl || art.featuredImageUrl.trim().length === 0 || art.featuredImageUrl.includes('undefined')) {
        const randomImg = defaultNewsImages[Math.floor(Math.random() * defaultNewsImages.length)];
        art.featuredImageUrl = randomImg;
        fixedImagesCount++;
        isModified = true;
      }

      // Ensure authorName & authorAvatar exist
      if (!art.authorName || art.authorName.trim().length === 0) {
        art.authorName = 'নির্ভীক বাংলা সংবাদ প্রতিনিধি';
        isModified = true;
      }

      // Ensure translations map has proper fallback for en and hi if missing
      const en = art.translations?.get ? art.translations.get('en') : art.translations?.en;
      const hi = art.translations?.get ? art.translations.get('hi') : art.translations?.hi;

      if (!en || !en.title) {
        art.translations.set('en', {
          title: title,
          slug: bn.slug ? `${bn.slug}-en` : art._id.toString(),
          excerpt: bn.excerpt || title,
          content: content,
          tags: bn.tags || ['news'],
          seo: bn.seo || { metaTitle: title, metaDescription: bn.excerpt || title }
        });
        fixedTranslationsCount++;
        isModified = true;
      }

      if (!hi || !hi.title) {
        art.translations.set('hi', {
          title: title,
          slug: bn.slug ? `${bn.slug}-hi` : art._id.toString(),
          excerpt: bn.excerpt || title,
          content: content,
          tags: bn.tags || ['समाचार'],
          seo: bn.seo || { metaTitle: title, metaDescription: bn.excerpt || title }
        });
        fixedTranslationsCount++;
        isModified = true;
      }

      if (isModified) {
        await art.save();
      }
    }

    console.log('\n=== Article Clean & Enrichment Complete ===');
    console.log(`- Deleted invalid/empty articles: ${deletedCount}`);
    console.log(`- Fixed missing/broken featured images: ${fixedImagesCount}`);
    console.log(`- Fixed missing language translations: ${fixedTranslationsCount}`);

    const remainingCount = await Article.countDocuments();
    console.log(`Final total clean & compliant articles in DB: ${remainingCount}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

cleanAndEnrich();
