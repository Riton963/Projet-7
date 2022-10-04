const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:userId', auth, multer, userCtrl.updateProfile);
router.put('/profileImg/:userId', auth, multer, userCtrl.updateProfileImg);
router.put('/coverImg/:userId', auth, multer, userCtrl.updateCoverImg);
router.get('/:userId', auth, multer, userCtrl.getUserById);
router.post('/followUser', auth, userCtrl.followedUser, userCtrl.followUser);

module.exports = router;
