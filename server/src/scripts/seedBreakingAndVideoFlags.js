const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function seedFlags() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    // Mark top 10 latest articles as isBreaking = true so breaking news is never empty
    const latest10 = await Article.find({}).sort({ publishedAt: -1 }).limit(10);
    const breakingIds = latest10.map((a) => a._id);
    await Article.updateMany({ _id: { $in: breakingIds } }, { $set: { isBreaking: true } });
    console.log(`Updated ${breakingIds.length} articles with isBreaking = true`);

    // Mark 5 articles with videoUrl or sample video as isVideo = true / video
    const videoArticles = await Article.find({}).sort({ createdAt: -1 }).limit(5);
    const videoIds = videoArticles.map((a) => a._id);
    await Article.updateMany(
      { _id: { $in: videoIds } },
      {
        $set: {
          isVideo: true,
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      }
    );
    console.log(`Updated ${videoIds.length} articles with isVideo = true`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedFlags();
