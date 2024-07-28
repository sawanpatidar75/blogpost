import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../slices/blogSlice';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBlog({ title, content, token: user.token }))
            .then(() => navigate('/blogs'));
    };

    return (
        <div>
            <h2>Add Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button type="submit">Add Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;
