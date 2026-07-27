const express = require('express');
const router = express.Router();
const { getDashboardMetrics } = require('../../controllers/analyticsController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

router.use(protect);

router.get('/dashboard', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), getDashboardMetrics);

module.exports = router;
