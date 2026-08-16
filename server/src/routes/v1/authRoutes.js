const express = require('express');
const router = express.Router();
const { login, register, getMe, updateProfile, uploadAvatar } = require('../../controllers/authController');
const { protect } = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, upload.single('file'), uploadAvatar);

module.exports = router;
