const express = require('express');
const router = express.Router();
const { getComments, updateCommentStatus, deleteComment } = require('../../controllers/commentController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

// @route   GET /api/v1/comments
router.get('/', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), getComments);

// @route   PUT /api/v1/comments/:id/status
router.put('/:id/status', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), updateCommentStatus);

// @route   DELETE /api/v1/comments/:id
router.delete('/:id', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), deleteComment);

module.exports = router;
