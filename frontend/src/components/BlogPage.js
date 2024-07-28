import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, lockBlog, unlockBlog } from '../slices/blogSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, status, error, successMessage } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);
  const blog = blogs.find((blog) => blog._id === id);

  useEffect(() => {
    if (!blog) {
      dispatch(fetchBlogs(user.token));
    }
  }, [dispatch, blog]);

  const handleEdit = () => {
    dispatch(lockBlog({ id, token: user.token })).then(() => {
      navigate(`/edit-blog/${id}`);
    });
  };

  const handleUnlock = () => {
    dispatch(unlockBlog({ id, token: user.token }));
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          {user && blog.lockedBy === user._id && (
            <button onClick={handleUnlock}>Unlock</button>
          )}
          {user && !blog.lockedBy && (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
