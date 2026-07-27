const express = require('express');
const router = express.Router();
const { getTags, createTag, deleteTag } = require('../../controllers/tagController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

router.route('/')
  .get(getTags)
  .post(protect, createTag); // Reporters can also create tags

router.route('/:id')
  .delete(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), deleteTag);

module.exports = router;
