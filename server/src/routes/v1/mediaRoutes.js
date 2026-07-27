const express = require('express');
const router = express.Router();
const { uploadMedia, getMediaList, deleteMedia } = require('../../controllers/mediaController');
const { protect, authorize } = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const { ROLES } = require('../../constants/roles');

router.route('/')
  .get(protect, getMediaList)
  .post(protect, upload.single('file'), uploadMedia);

router.route('/:id')
  .delete(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), deleteMedia);

module.exports = router;
