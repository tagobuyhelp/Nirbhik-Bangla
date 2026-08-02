const express = require('express');
const router = express.Router();
const {
  getSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule
} = require('../../controllers/scheduleController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

router.route('/')
  .get(getSchedules)
  .post(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), createSchedule);

router.route('/:id')
  .get(getSchedule)
  .put(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), updateSchedule)
  .delete(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), deleteSchedule);

module.exports = router;
