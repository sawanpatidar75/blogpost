import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../slices/blogSlice';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blogs);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBlogs(user && user.token));
  }, [dispatch]);

  return (
    <div>
      <h2>Blog List</h2>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {blogs.map((blog) => (
        <div key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <h3>{blog.title}</h3>
          </Link>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
