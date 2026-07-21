require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./models/Article');

const createSeededArticle = ({ categorySlug, categoryName, titleBn, titleEn, titleHi, slug, featuredImage, isVideo = false, videoUrl = '', isBreaking = false, isFeatured = false, isTrending = false }) => ({
  categorySlug,
  categoryName,
  featuredImageUrl: featuredImage,
  galleryUrls: [
    featuredImage,
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  ],
  videoUrl,
  isVideo,
  isBreaking,
  isFeatured,
  isTrending,
  viewsCount: Math.floor(Math.random() * 3000) + 500,
  translations: {
    bn: {
      title: titleBn,
      slug,
      excerpt: `${titleBn}-এর বিষয়ে বিস্তারিত পড়ুন নির্ভীক বাংলায়।`,
      content: `
        <p className="lead"><strong>আসানসোল ও দুর্গাপুর:</strong> ${titleBn}-এর ওপর বিশেষ অনুসন্ধানমূলক প্রতিবেদন প্রকাশ করল নির্ভীক বাংলা সংবাদ টিম।</p>
        <h3>বিশেষ আপডেট ও পরিকাঠামো</h3>
        <p>গত কয়েক দিনে এলাকার উন্নয়ন ও জনস্বার্থে একাধিক নতুন পদক্ষেপ গ্রহণ করেছে স্থানীয় প্রশাসন। সড়ক উন্নয়ন, জল পরিষেবা এবং ড্রেনেজ ব্যবস্থার মান বাড়াতে জোর দেওয়া হচ্ছে।</p>
        <blockquote>"সাধারণ মানুষের পরিষেবা দ্রুত ও নিশ্চিত করাই আমাদের প্রথম অগ্রাধিকার।" — প্রশাসনিক কর্মকর্তা।</blockquote>
        <p>ভবিষ্যতে এই প্রকল্প বাস্তবায়িত হলে এলাকার হাজার হাজার মানুষের জীবনযাত্রার মান বহুগুণ বৃদ্ধি পাবে।</p>
      `,
      seo: { title: `${titleBn} | নির্ভীক বাংলা`, description: `${titleBn} সংক্রান্ত তাজা খবর।`, keywords: [categoryName, 'সংবাদ', 'পশ্চিমবঙ্গ'] },
      status: 'published',
    },
    en: {
      title: titleEn,
      slug,
      excerpt: `Read detailed report on ${titleEn} on Nirbhik Bangla.`,
      content: `
        <p className="lead"><strong>Asansol & Durgapur:</strong> Nirbhik Bangla news team brings an in-depth report on ${titleEn}.</p>
        <h3>Special Updates & Infrastructure</h3>
        <p>In recent days, local authorities have initiated several key projects for regional development and public welfare. Infrastructure, water services, and connectivity are being prioritized.</p>
        <blockquote>"Providing fast and reliable public services remains our topmost priority." — Administration Officer.</blockquote>
      `,
      seo: { title: `${titleEn} | Nirbhik Bangla`, description: `Latest updates on ${titleEn}.`, keywords: [categoryName, 'News', 'West Bengal'] },
      status: 'published',
    },
    hi: {
      title: titleHi,
      slug,
      excerpt: `${titleHi} पर विस्तृत रिपोर्ट पढ़ें निर्भीक बांग्ला पर।`,
      content: `
        <p className="lead"><strong>आसनसोल व दुर्गापुर:</strong> निर्भीक बांग्ला समाचार टीम ${titleHi} पर विशेष रिपोर्ट प्रस्तुत कर रही है।</p>
        <p>हाल के दिनों में स्थानीय प्रशासन ने क्षेत्रीय विकास के लिए कई महत्वपूर्ण कदम उठाए हैं।</p>
      `,
      seo: { title: `${titleHi} | निर्भीक बांग्ला`, description: `${titleHi} पर ताजा समाचार।`, keywords: [categoryName, 'समाचार'] },
      status: 'published',
    },
  },
});

const articlesToSeed = [
  // Paschim Bardhaman (6 posts)
  createSeededArticle({
    categorySlug: 'paschim-bardhaman',
    categoryName: 'পশ্চিম বর্ধমান',
    titleBn: 'পশ্চিম বর্ধমানে ৫০০ কোটি টাকা ব্যয়ে মেগা শিল্প পার্ক নির্মাণ, কর্মসংস্থান হবে ৫ হাজার তরুণের',
    titleEn: 'Mega Industrial Park with ₹500 Crore Investment Announced in Paschim Bardhaman',
    titleHi: 'पश्चिम बर्धमान में ₹500 करोड़ के निवेश से मेगा औद्योगिक पार्क की घोषणा',
    slug: 'paschim-bardhaman-new-industrial-park-500-crore',
    featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85',
    isFeatured: true,
    isBreaking: true,
  }),
  createSeededArticle({
    categorySlug: 'paschim-bardhaman',
    categoryName: 'পশ্চিম বর্ধমান',
    titleBn: 'পশ্চিম বর্ধমানে গ্রামীণ সড়ক সংস্কারে জোর দিল জেলা পরিষদ, ৫০ কিমি রাস্তা পুনর্নির্মাণ',
    titleEn: 'Zilla Parishad Focuses on 50 km Rural Road Repair in Paschim Bardhaman',
    titleHi: 'पश्चिम बर्धमान में 50 किमी ग्रामीण सड़कों की मरम्मत पर जिला परिषद का जोर',
    slug: 'paschim-bardhaman-rural-road-repair',
    featuredImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85',
  }),

  // Asansol (6 posts)
  createSeededArticle({
    categorySlug: 'asansol',
    categoryName: 'আসানসোল',
    titleBn: 'আসানসোল জিটি রোডের যানজট নিরসনে ২.৫ কিলোমিটার দীর্ঘ আধুনিক ৪-লেনের ফ্লাইওভারের ব্লু-প্রিন্ট প্রকাশ',
    titleEn: '2.5 km Long 4-Lane Modern Flyover Blueprint Released to Unclog Asansol GT Road Traffic',
    titleHi: 'आसनसोल जीटी रोड पर ट्रैफिक जाम से मुक्ति के लिए 2.5 किमी लंबे 4-लेन फ्लाईओवर का ब्लूप्रिंट जारी',
    slug: 'asansol-gt-road-new-flyover-plan',
    featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isTrending: true,
  }),
  createSeededArticle({
    categorySlug: 'asansol',
    categoryName: 'আসানসোল',
    titleBn: 'আসানসোল জেলা হাসপাতালে নতুন আইসিইউ বিভাগ উদ্বোধন, উন্নত স্বাস্থ্যসেবার আশ্বাস',
    titleEn: 'New ICU Wing Inaugurated at Asansol District Hospital',
    titleHi: 'आसनसोल जिला अस्पताल में नए आईसीयू वार्ड का उद्घाटन',
    slug: 'asansol-hospital-new-icu-unit',
    featuredImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85',
  }),

  // Durgapur (6 posts)
  createSeededArticle({
    categorySlug: 'durgapur',
    categoryName: 'দুর্গাপুর',
    titleBn: 'দুর্গাপুর স্টিল প্ল্যান্টে পরিবেশবান্ধব গ্রিন স্টিল প্রযুক্তির সূচনা',
    titleEn: 'Green Steel Technology Eco-Friendly Initiative Launched at Durgapur Steel Plant',
    titleHi: 'दुर्गापुर स्टील प्लांट में ग्रीन स्टील तकनीक की शुरुआत',
    slug: 'durgapur-steel-plant-green-tech',
    featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    isFeatured: true,
  }),

  // Video Posts
  createSeededArticle({
    categorySlug: 'video',
    categoryName: 'ভিডিও',
    titleBn: 'নির্ভীক বাংলা স্পেশাল ভিডিও বুলেটিন: জেলার রাজনীতি, আবহাওয়ার মেগাবুলোটিন ও মাঠের সেরা খবর',
    titleEn: 'Nirbhik Bangla Special Video Bulletin: Top Regional Politics, Weather & On-Ground Reports',
    titleHi: 'निर्भीक बांग्ला विशेष वीडियो बुलेटिन: क्षेत्रीय राजनीति, मौसम और ग्राउंड रिपोर्ट',
    slug: 'nirbhik-bangla-live-bulletin-video-update',
    featuredImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=85',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    isFeatured: true,
  }),
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to MongoDB successfully.');

    try {
      await Article.collection.dropIndexes();
      console.log('Dropped legacy indexes successfully.');
    } catch (e) {
      console.log('No existing indexes to drop.');
    }

    await Article.deleteMany({});
    console.log('Cleared existing articles.');

    const inserted = await Article.insertMany(articlesToSeed);
    console.log(`✅ Successfully seeded ${inserted.length} multi-language, multi-image & video articles into MongoDB!`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
