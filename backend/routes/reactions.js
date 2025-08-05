const express = require('express');
const router = express.Router();
const { likePost, dislikePost } = require('../controllers/reactionController');

const auth = require('../middleware/authMiddleware');

router.post('/:postId/like', auth, likePost);
router.post('/:postId/dislike', auth, dislikePost);

module.exports = router;
