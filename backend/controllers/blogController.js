const blogModel = require("../models/blogModel");

exports.addBlog = async (req, res, next) => {
    try {
        let { title, content } = req.body;

        let checkBlog = await blogModel.find({
            $and: [
                { title: title },
                { content: content }
            ],
        });
        if (checkBlog && checkBlog.length > 0) {
            return res.status(200).json({ message: 'Blog already created.', data: checkBlog });
        }

        const blog = await blogModel({
            title: title,
            content: content,
            lastEditedBy: req.user._id,
            isLocked: false,
            isLocked: null,
            lockedAt: null
        });
        const addBlog = await blog.save();
        return res.status(200).json({ message: 'Blog added successfully.', data: addBlog });

    } catch (error) {
        return res.status(500).json({ message: 'Unable to add blog.', data: error });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        console.log("Get Blogs: ");
        const blogs = await blogModel.find();
        console.log("Blogs: ", blogs);
        return res.status(200).json({ message: 'Blogs get successfully.', data: blogs });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to get blogs.', data: error });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        return res.status(200).json({ message: 'Blog get successfully.', data: blog });
    } catch (error) {
        return res.status(500).json({ message: 'Unable to get blog.', data: error });
    }
};

exports.updateBlog = async (req, res, next) => {
    const { title, content } = req.body;
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.', data: blog });
        }
        blog.title = title;
        blog.content = content;
        blog.lastEditedBy = req.user._id;
        blog.isLocked = false;
        blog.lockedBy = null;
        blog.lockedAt = null;
        await blog.save();
        return res.status(200).json({ message: 'Blog updated successfully.', data: blog });
    } catch (error) {
        return res.status(500).json({ message: 'Server error when update blog.', data: error });
    }
};

exports.lockBlog = async (req, res, next) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found', data: blog });
        }
        if (blog.isLocked && blog.lockedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Blog is locked by another user', data: blog });
        }
        blog.isLocked = true;
        blog.lockedBy = req.user._id;
        blog.lockedAt = new Date();
        await blog.save();
        return res.status(200).json({ message: 'Blog is locked.', data: blog });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', data: error });
    }
};

exports.unlockBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (blog && blog.isLocked && blog.lockedBy.toString() === req.user._id.toString()) {
            blog.isLocked = false;
            blog.lockedBy = null;
            blog.lockedAt = null;
            await blog.save();
        }
        return res.status(200).json({ message: 'Blog is unlocked', data: blog });
    } catch (error) {
        return res.status(500).json({ message: 'Server error when unlock blog.', data: error });
    }
};



