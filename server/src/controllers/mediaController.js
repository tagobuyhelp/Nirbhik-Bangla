const fs = require('fs');
const path = require('path');
const Media = require('../models/Media');
const sendResponse = require('../utils/responseHandler');
const cloudinary = require('../config/cloudinary');

// Ensure local uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper to determine resource type
const getResourceType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  return 'raw';
};

// @desc    Upload media
// @route   POST /api/v1/media
// @access  Private
exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendResponse(res, 400, 'Please upload a file');
    }

    const fileBuffer = req.file.buffer;
    const resourceType = getResourceType(req.file.mimetype);

    let mediaUrl = '';
    let cloudinaryId = '';
    let width = 1200;
    let height = 675;

    // Try Cloudinary upload stream first
    try {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const uploadOptions = {
          resource_type: resourceType,
          folder: 'nirbhik_bangla'
        };

        if (resourceType === 'image') {
          uploadOptions.transformation = [
            { width: 1200, height: 675, crop: 'fill', gravity: 'auto' },
            { quality: 'auto' },
            { fetch_format: 'webp' }
          ];
          uploadOptions.format = 'webp';
        }

        const stream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });

      mediaUrl = cloudinaryResult.secure_url;
      cloudinaryId = cloudinaryResult.public_id;
      width = cloudinaryResult.width || 1200;
      height = cloudinaryResult.height || 675;
    } catch (cloudinaryError) {
      console.warn('[MEDIA UPLOAD]: Cloudinary upload failed or not configured, saving to local static storage:', cloudinaryError.message);
      
      // Fallback: Save file permanently to local uploads folder
      const ext = path.extname(req.file.originalname) || (resourceType === 'image' ? '.jpg' : '');
      const uniqueFilename = `media_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
      const filePath = path.join(uploadsDir, uniqueFilename);
      
      fs.writeFileSync(filePath, fileBuffer);
      
      const protocol = req.protocol || 'http';
      const host = req.get('host') || 'localhost:5000';
      mediaUrl = `${protocol}://${host}/uploads/${uniqueFilename}`;
    }

    // Save to DB
    const mediaType = resourceType === 'raw' ? 'document' : resourceType;

    const media = await Media.create({
      title: req.body.title || req.file.originalname,
      type: mediaType,
      mime: req.file.mimetype,
      size: req.file.size,
      width,
      height,
      cloudinary_id: cloudinaryId,
      url: mediaUrl,
      thumbnailUrl: mediaUrl,
      uploadedBy: req.user ? req.user.id : null
    });

    return sendResponse(res, 201, 'Media uploaded successfully', media);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all media
// @route   GET /api/v1/media
// @access  Private
exports.getMediaList = async (req, res, next) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (type) query.type = type;

    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('uploadedBy', 'name email');

    const total = await Media.countDocuments(query);

    return sendResponse(res, 200, 'Media fetched successfully', media, {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media
// @route   DELETE /api/v1/media/:id
// @access  Private/Admin
exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return sendResponse(res, 404, 'Media not found');
    }

    // Delete from cloudinary
    if (media.cloudinary_id) {
      const resourceType = media.type === 'document' ? 'raw' : media.type;
      await cloudinary.uploader.destroy(media.cloudinary_id, { resource_type: resourceType });
    }

    await media.deleteOne();

    return sendResponse(res, 200, 'Media deleted successfully', {});
  } catch (error) {
    next(error);
  }
};
