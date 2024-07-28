import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlog, editBlog, lockBlog, unlockBlog } from '../slices/blogSlice';
import { useParams, useNavigate } from 'react-router-dom';

const BlogEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blog, status, error } = useSelector((state) => state.blogs);
    const { token, user } = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        if (user.token) {
            dispatch(fetchBlog({ id, token: user.token }));
        }
    }, [dispatch, id, user.token]);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setIsLocked(blog.isLocked && blog.lockedBy !== user.id);
        }
    }, [blog, user]);

    const handleSave = () => {
        dispatch(editBlog({ id, blogData: { title, content }, token: user.token }))
            .then(() => navigate('/blogs'));
    };

    const handleLock = () => {
        dispatch(lockBlog({ id, token: user.token }));
    };

    const handleUnlock = () => {
        dispatch(unlockBlog({ id, token: user.token }));
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Edit Blog</h2>
            {isLocked && <p>This blog is locked by another user</p>}
            {!isLocked && (
                <div>
                    <div>
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleLock}>Lock</button>
                    <button onClick={handleUnlock}>Unlock</button>
                </div>
            )}
        </div>
    );
};

export default BlogEdit;
