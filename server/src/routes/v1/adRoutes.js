const express = require('express');
const router = express.Router();
const {
  getAds,
  createAd,
  updateAd,
  deleteAd
} = require('../../controllers/adController');
const { protect, authorize } = require('../../middlewares/auth');
const { ROLES } = require('../../constants/roles');

router.use(protect);
router.use(authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ADVERTISEMENT_MANAGER));

router.route('/')
  .get(getAds)
  .post(createAd);

router.route('/:id')
  .put(updateAd)
  .delete(deleteAd);

module.exports = router;
