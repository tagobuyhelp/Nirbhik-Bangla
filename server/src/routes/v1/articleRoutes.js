const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../../controllers/articleController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

router.route('/')
  .get(protect, getArticles)
  .post(protect, createArticle);

router.route('/:id')
  .get(protect, getArticle)
  .put(protect, updateArticle)
  .delete(protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGING_EDITOR), deleteArticle);

module.exports = router;
