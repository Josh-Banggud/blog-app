const express = require('express');
const router = express.Router();
const { signUp, login, getProfile, updateProfile } = require('../controllers/authController');

const auth = require('../middleware/authMiddleware');

router.post('/sign-up', signUp);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile/update', auth, updateProfile);

module.exports = router;
