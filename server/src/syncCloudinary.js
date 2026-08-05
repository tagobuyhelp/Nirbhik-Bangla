const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const Media = require('./models/Media');

// Load env vars
dotenv.config();

// Connect Database
const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/nirbhik-bangla';
mongoose.connect(dbUri)
  .then(() => console.log('MongoDB Connected for Syncing...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const syncCloudinary = async () => {
  try {
    console.log('Fetching resources from Cloudinary...');
    
    // Fetch all resources (images and videos)
    // Cloudinary paginates results, we can loop with next_cursor if there are many.
    // We'll fetch images and videos.
    const resourceTypes = ['image', 'video', 'raw'];
    let syncedCount = 0;
    
    // Default admin user id for uploadedBy if we don't know who uploaded it
    // We'll just use a dummy object id if we can't find an admin
    const dummyUserId = new mongoose.Types.ObjectId();

    for (const resType of resourceTypes) {
      let nextCursor = null;
      do {
        const options = {
          resource_type: resType,
          max_results: 500,
        };
        if (nextCursor) {
          options.next_cursor = nextCursor;
        }

        const result = await cloudinary.api.resources(options);
        
        for (const item of result.resources) {
          // Check if it already exists in DB
          const existingMedia = await Media.findOne({ cloudinary_id: item.public_id });
          
          if (!existingMedia) {
            // Determine type and mime
            let type = resType;
            if (resType === 'raw') type = 'document';
            
            let mime = item.format ? `${resType}/${item.format}` : `${resType}/unknown`;
            
            await Media.create({
              title: item.public_id.split('/').pop() || 'Cloudinary Media',
              type: type,
              mime: mime,
              size: item.bytes,
              width: item.width || 0,
              height: item.height || 0,
              cloudinary_id: item.public_id,
              url: item.secure_url,
              thumbnailUrl: item.secure_url, // For videos, might need transformations, but URL is fine as fallback
              uploadedBy: dummyUserId
            });
            syncedCount++;
          }
        }
        
        nextCursor = result.next_cursor;
      } while (nextCursor);
    }

    console.log(`Successfully synced ${syncedCount} new media files from Cloudinary!`);
    process.exit(0);
  } catch (error) {
    console.error('Error syncing with Cloudinary:', error);
    process.exit(1);
  }
};

syncCloudinary();
