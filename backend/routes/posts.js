const express = require('express');
const router = express.Router();
const { createPost, saveDraft, publishDraft, deletePost, getPosts, getDrafts } = require('../controllers/postController');

const auth = require('../middleware/authMiddleware');

router.get('/all', getPosts);
// router.post('/create', auth, createPost);
router.post('/draft', auth, saveDraft);
router.get('/draft/all', auth, getDrafts);
router.put('/:id/publish', auth, publishDraft);
router.delete('/:id/delete', auth, deletePost);

module.exports = router;
