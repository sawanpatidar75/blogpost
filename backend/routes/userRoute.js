const express = require('express');
const { userLogin, userSignup, userProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/profile', authenticateUser, userProfile);

module.exports = router;
