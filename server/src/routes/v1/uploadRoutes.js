const express = require('express');
const router = express.Router();
const uploadController = require('../../controllers/uploadController');

router.post('/thumbnail', uploadController.uploadThumbnail);

module.exports = router;
