const express = require('express');
const router = express.Router();
const socialController = require('../../controllers/socialController');

router.get('/', socialController.getSocialAccounts);
router.put('/:id', socialController.updateSocialAccount);
router.post('/broadcast', socialController.broadcastPost);
router.post('/generate-captions', socialController.generateSocialCaptions);

module.exports = router;
