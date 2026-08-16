const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../../controllers/settingsController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

// @route   GET /api/v1/settings
router.get('/', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), getSettings);

// @route   PUT /api/v1/settings
router.put('/', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), updateSettings);

module.exports = router;
