const Media = require('../models/Media');
const sendResponse = require('../utils/responseHandler');
const cloudinary = require('../config/cloudinary');

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

    // Upload to cloudinary via stream
    const uploadToCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: resourceType,
            folder: 'nirbhik_bangla'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const cloudinaryResult = await uploadToCloudinary(fileBuffer);

    // Save to DB
    const mediaType = resourceType === 'raw' ? 'document' : resourceType;

    const media = await Media.create({
      title: req.body.title || req.file.originalname,
      type: mediaType,
      mime: req.file.mimetype,
      size: req.file.size,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      cloudinary_id: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
      thumbnailUrl: resourceType === 'image' ? cloudinary.url(cloudinaryResult.public_id, { width: 300, crop: 'scale' }) : '',
      uploadedBy: req.user.id
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
