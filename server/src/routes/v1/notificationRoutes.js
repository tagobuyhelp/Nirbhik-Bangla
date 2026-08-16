const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notificationController');

router.get('/vapid-public-key', notificationController.getVapidPublicKey);
router.post('/subscribe', notificationController.subscribe);
router.post('/send-test', notificationController.sendTestNotification);

module.exports = router;
