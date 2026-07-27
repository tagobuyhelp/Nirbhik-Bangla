const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../../controllers/categoryController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

router.route('/')
  .get(getCategories)
  .post(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), createCategory);

router.route('/:id')
  .put(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), updateCategory)
  .delete(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), deleteCategory);

router.route('/by-slug/:slug')
  .get(getCategory);

module.exports = router;
