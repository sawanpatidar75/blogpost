import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const login = (formData) => API.post('/api/auth/login', formData);
export const signup = (formData) => API.post('/api/auth/signup', formData);
export const fetchBlogs = () => API.get('/api/blogs');
export const addBlog = (newBlog) => API.post('/api/blogs', newBlog);
export const editBlog = (id, updatedBlog) => API.put(`/api/blogs/${id}`, updatedBlog);
export const lockBlog = (id) => API.post(`/api/blogs/${id}/lock`);
export const unlockBlog = (id) => API.post(`/api/blogs/${id}/unlock`);
