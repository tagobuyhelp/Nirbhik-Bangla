const express = require('express');
const router = express.Router();
const { getDashboardMetrics, getAnalyticsOverview, syncArticleViews } = require('../../controllers/analyticsController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

router.use(protect);

router.get('/dashboard', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), getDashboardMetrics);
router.get('/overview', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), getAnalyticsOverview);
router.post('/sync-views', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), syncArticleViews);

module.exports = router;
