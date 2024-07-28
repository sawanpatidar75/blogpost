const express = require('express');
const { getBlogs, getBlogById, lockBlog, updateBlog, unlockBlog, addBlog } = require('../controllers/blogController');
const router = express.Router();

router.post('/add-blog', addBlog);
router.get('/get-blogs', getBlogs);
router.get('/:id', getBlogById);
router.post('/lock/:id', lockBlog);
router.post('/update/:id', updateBlog);
router.post('/unlock/:id', unlockBlog);

module.exports = router;
