const express = require('express');
const {
  getPlacements,
  createPlacement,
  updatePlacement,
  deletePlacement
} = require('../../controllers/placementController');

const router = express.Router();

router.route('/')
  .get(getPlacements)
  .post(createPlacement);

router.route('/:id')
  .put(updatePlacement)
  .delete(deletePlacement);

module.exports = router;
