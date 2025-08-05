const express = require('express');
const router = express.Router();
const { createPost, deletePost, getPosts } = require('../controllers/postController');

const auth = require('../middleware/authMiddleware');

router.get('/all', getPosts);
router.post('/create', auth, createPost);
router.delete('/:id', auth, deletePost);

module.exports = router;
