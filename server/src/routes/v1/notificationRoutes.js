const express = require('express');
const router = express.Router();
const pushService = require('../../services/pushNotificationService');
const sendResponse = require('../../utils/responseHandler');
const NotificationLog = require('../../models/NotificationLog');

// GET /api/v1/notifications/vapid-public-key
router.get('/vapid-public-key', (req, res) => {
  const publicKey = pushService.getPublicKey();
  res.json({ success: true, data: { publicKey } });
});

// POST /api/v1/notifications/subscribe
router.post('/subscribe', async (req, res, next) => {
  try {
    const { subscription } = req.body;
    if (!subscription) {
      return sendResponse(res, 400, 'Subscription payload is required');
    }
    const userAgent = req.headers['user-agent'] || '';
    const sub = await pushService.subscribe(subscription, userAgent);
    return sendResponse(res, 201, 'Successfully subscribed to Web Push Notifications', sub);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/notifications/unsubscribe
router.post('/unsubscribe', async (req, res, next) => {
  try {
    const { endpoint } = req.body;
    if (!endpoint) {
      return sendResponse(res, 400, 'Endpoint is required to unsubscribe');
    }
    await pushService.unsubscribe(endpoint);
    return sendResponse(res, 200, 'Unsubscribed successfully');
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/notifications/broadcast (Admin)
router.post('/broadcast', async (req, res, next) => {
  try {
    const { title, body, icon, image, url, target } = req.body;
    if (!title || !body) {
      return sendResponse(res, 400, 'Title and Body are required for broadcast');
    }
    const result = await pushService.sendBroadcast({
      title,
      body,
      icon,
      image,
      url,
      target,
      createdBy: req.user ? req.user._id : undefined
    });
    return sendResponse(res, 200, 'Push broadcast dispatched', result);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/notifications/stats (Admin)
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await pushService.getStats();
    const recentLogs = await NotificationLog.find().sort({ createdAt: -1 }).limit(10);
    return sendResponse(res, 200, 'Notification statistics fetched', { stats, recentLogs });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/notifications/:id/click (Analytics CTR tracking)
router.post('/:id/click', async (req, res, next) => {
  try {
    await NotificationLog.findByIdAndUpdate(req.params.id, { $inc: { totalClicked: 1 } });
    return sendResponse(res, 200, 'Click recorded');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
