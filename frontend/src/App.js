import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import BlogPage from './components/BlogPage';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const App = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<BlogList />} />
                {/* <Route path="/" element={<Navigate replace to={'/login'} />} /> */}
                <Route path="/login" element={<PublicRoute element={<Login />} />} />
                <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
                <Route path="/add-blog" element={<PrivateRoute element={<BlogForm />} />} />
                {/* <Route path="/get-blog" element={<PrivateRoute element={<BlogList />} />} /> */}
                <Route path="/edit-blog/:id" element={<PrivateRoute element={<BlogForm isEditing />} />} />
                <Route path="/blogs/:id" element={<BlogPage />} />
            </Routes>
        </Router>
    );
};

export default App;
