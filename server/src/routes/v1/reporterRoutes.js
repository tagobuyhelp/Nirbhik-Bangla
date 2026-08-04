const express = require('express');
const router = express.Router();
const {
  getReporters,
  getReporterStats,
  getReporter,
  createReporter,
  updateReporter,
  deleteReporter,
  updateReporterStatus
} = require('../../controllers/reporterController');
const { uploadReporterAvatar } = require('../../controllers/reporterController');
const upload = require('../../middlewares/upload');
const { protect } = require('../../middlewares/auth');

// Stats endpoint (must come before /:id)
router.get('/stats', protect, getReporterStats);

// Avatar upload endpoint
router.post('/upload-avatar', protect, upload.single('avatar'), uploadReporterAvatar);

// CRUD
router.route('/')
  .get(protect, getReporters)
  .post(protect, createReporter);

router.route('/:id')
  .get(protect, getReporter)
  .put(protect, updateReporter)
  .delete(protect, deleteReporter);

router.patch('/:id/status', protect, updateReporterStatus);

module.exports = router;
