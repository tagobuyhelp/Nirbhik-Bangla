const express = require('express');
const router = express.Router();
const videoController = require('../../controllers/videoController');

router.get('/', videoController.getVideos);
router.post('/', videoController.createVideo);
router.post('/fetch-info', videoController.fetchYoutubeDetails);
router.post('/bulk-delete', videoController.bulkDeleteVideos);
router.get('/:id', videoController.getVideoById);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
