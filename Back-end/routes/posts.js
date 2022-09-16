const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:userId', postsCtrl.getPostsById);
router.post('/', auth, multer, postsCtrl.createPost);
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.post('/:userId/like', auth, postsCtrl.likePost);
router.delete('/:id', auth, multer, postsCtrl.deletePost);

module.exports = router;
