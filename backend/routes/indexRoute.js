const express = require('express');
const { authenticateUser } = require('../middlewares/auth');
const router = express.Router();

router.use('/user', require('./userRoute'));
router.use('/blog', authenticateUser, require('./blogRoute'));

module.exports = router;