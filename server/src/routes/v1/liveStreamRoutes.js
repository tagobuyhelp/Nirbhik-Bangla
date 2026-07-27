const express = require('express');
const router = express.Router();
const {
  getLiveStreams,
  getLiveStream,
  createLiveStream,
  updateLiveStream,
  deleteLiveStream
} = require('../../controllers/liveStreamController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

router.route('/')
  .get(getLiveStreams)
  .post(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), createLiveStream);

router.route('/:id')
  .get(getLiveStream)
  .put(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), updateLiveStream)
  .delete(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), deleteLiveStream);

module.exports = router;
