const express = require('express');
const router = express.Router();
const { getActivePoll, votePoll } = require('../../controllers/pollController');

router.get('/active', getActivePoll);
router.post('/:id/vote', votePoll);

module.exports = router;
