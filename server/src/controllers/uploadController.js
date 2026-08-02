// @desc    Upload thumbnail image
// @route   POST /api/v1/upload/thumbnail
// @access  Admin
exports.uploadThumbnail = async (req, res) => {
  try {
    const { imageBase64, imageName } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, message: 'Image data is required' });
    }

    // Return uploaded image payload or data URI (Lightweight, zero extra cloud cost)
    return res.status(200).json({
      success: true,
      message: 'Thumbnail uploaded successfully',
      url: imageBase64
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process thumbnail',
      error: error.message
    });
  }
};
