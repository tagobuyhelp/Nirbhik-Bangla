const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Article = require('../models/Article');
const User = require('../models/User');

async function updateAllArticlesAuthor() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  // 1. Fetch Super Admin / Admin User from Database
  let adminUser = await User.findOne({
    $or: [
      { role: 'Super Admin' },
      { role: 'Admin' },
      { role: 'admin' },
      { email: 'admin@nirbhikbangla.com' }
    ]
  });

  let adminName = 'Abdul Haque';
  let adminAvatar = 'https://res.cloudinary.com/tw5058et/image/upload/v1786858841/nirbhik_bangla/avatars/gtchkpcote1qsauuc6ou.webp';
  let adminBio = 'System Administrator & Editor-in-Chief';

  if (adminUser) {
    adminName = adminUser.name || adminName;
    if (adminUser.avatar && adminUser.avatar.startsWith('http')) {
      adminAvatar = adminUser.avatar;
    }
    if (adminUser.bio) {
      adminBio = adminUser.bio;
    }
  }

  console.log(`👤 Admin User Identified: Name = "${adminName}", Avatar = "${adminAvatar}"`);

  // 2. Update all 1,289 articles in bulk with authorName and authorAvatar
  const result = await Article.updateMany(
    {},
    {
      $set: {
        authorName: adminName,
        authorAvatar: adminAvatar,
      }
    }
  );

  console.log('\n================ AUTHOR UPDATE REPORT ================');
  console.log(`✅ Total Articles Matched: ${result.matchedCount}`);
  console.log(`✨ Articles Updated with Admin Avatar: ${result.modifiedCount}`);
  console.log('=====================================================\n');

  await mongoose.disconnect();
  console.log('🎉 Super Admin Name & Cloudinary Avatar Successfully Updated on All DB Posts!');
}

updateAllArticlesAuthor().catch((err) => {
  console.error('❌ Update Error:', err);
  process.exit(1);
});
