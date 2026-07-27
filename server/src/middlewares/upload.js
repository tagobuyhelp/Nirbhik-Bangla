const multer = require('multer');

// Store files in memory temporarily
const storage = multer.memoryStorage();

// File filter (optional: restrict to images/videos only)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/') ||
    file.mimetype.startsWith('audio/') ||
    file.mimetype.startsWith('application/')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max limit
  },
  fileFilter
});

module.exports = upload;
