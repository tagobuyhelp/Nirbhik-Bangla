const mongoose = require('mongoose');
const https = require('https');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const Article = require('../models/Article');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const OLD_SERVER_IP = '93.127.173.33';

function downloadImageFromOldIP(imagePath) {
  return new Promise((resolve, reject) => {
    const cleanPath = imagePath.startsWith('/') ? imagePath : '/' + imagePath;
    const req = https.request({
      host: OLD_SERVER_IP,
      port: 443,
      path: cleanPath,
      method: 'GET',
      rejectUnauthorized: false,
      headers: {
        'Host': 'nirbhikbangla.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', (err) => reject(err));
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    req.end();
  });
}

function uploadBufferToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const publicId = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const uploadStream = cloudinary.uploader.upload_stream({
      folder: 'nirbhik_bangla/wp_uploads',
      public_id: publicId,
      overwrite: true,
      resource_type: 'auto'
    }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });
    uploadStream.end(buffer);
  });
}

async function migrateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to Local MongoDB!');

    const articles = await Article.find({});
    console.log(`Processing ${articles.length} articles for image migration...\n`);

    let successCount = 0;
    let fallbackCount = 0;
    let skippedCount = 0;

    const categoryFallbackImages = {
      'politics': 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80',
      'khela': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      'binodon': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'lifestyle': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
      'projukti': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'business': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      'paschim-bardhaman': 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
      'asansol': 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
      'durgapur': 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
      'default': 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80'
    };

    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      const url = art.featuredImageUrl || '';

      if (url.includes('cloudinary.com')) {
        skippedCount++;
        continue;
      }

      if (url.includes('wp-content') || url.includes('nirbhikbangla.com')) {
        try {
          const urlObj = new URL(url.startsWith('http') ? url : `https://nirbhikbangla.com${url}`);
          const imagePath = urlObj.pathname;
          const filename = imagePath.split('/').pop() || `article_${art._id}.jpg`;

          console.log(`[${i + 1}/${articles.length}] Downloading old image: ${imagePath}`);
          const imageBuffer = await downloadImageFromOldIP(imagePath);

          console.log(`Uploading to Cloudinary... (${imageBuffer.length} bytes)`);
          const cloudinaryUrl = await uploadBufferToCloudinary(imageBuffer, filename);

          art.featuredImageUrl = cloudinaryUrl;
          await art.save();

          console.log(`✓ [SUCCESS] Migrated to Cloudinary: ${cloudinaryUrl}`);
          successCount++;
        } catch (err) {
          console.log(`⚠ Failed to download old image (${err.message}). Using category fallback image.`);
          const fallback = categoryFallbackImages[art.categorySlug] || categoryFallbackImages['default'];
          art.featuredImageUrl = fallback;
          await art.save();
          fallbackCount++;
        }
      }
    }

    console.log('\n=== MIGRATION SUMMARY ===');
    console.log(`Successfully migrated to Cloudinary: ${successCount}`);
    console.log(`Set high-quality fallback images: ${fallbackCount}`);
    console.log(`Already on Cloudinary: ${skippedCount}`);

    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateImages();
