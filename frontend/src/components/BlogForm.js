import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, editBlog } from '../slices/blogSlice';
import { useParams, useNavigate } from 'react-router-dom';

const BlogForm = ({ isEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, status, error, successMessage } = useSelector((state) => state.blogs);
  const { user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ title: '', content: '' });
  const blog = blogs.find((blog) => blog._id === id);

  useEffect(() => {
    if (isEditing && blog) {
      setFormData({ title: blog.title, content: blog.content });
    }
  }, [isEditing, blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
        
      dispatch(editBlog({ id, blogData: formData, token: user.token }));
    } else {
      dispatch(addBlog({ title: formData.title, content: formData.content, token: user.token }));
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Blog' : 'Add Blog'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default BlogForm;
