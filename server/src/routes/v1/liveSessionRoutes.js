const express = require('express');
const {
  getCurrentLiveSession,
  getLiveSessions,
  createLiveSession,
  updateLiveSession,
  updateLiveSessionStatus,
  deleteLiveSession
} = require('../../controllers/liveSessionController');

// If you have auth middlewares, import them here
// const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/current')
  .get(getCurrentLiveSession);

router.route('/sessions')
  .get(getLiveSessions);

router.route('/session')
  .post(createLiveSession); // Add protect, authorize('admin', 'super-admin') later

router.route('/session/:id')
  .put(updateLiveSession) // protect, authorize
  .delete(deleteLiveSession); // protect, authorize

router.route('/session/:id/status')
  .put(updateLiveSessionStatus); // protect, authorize

module.exports = router;
