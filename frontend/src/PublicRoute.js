import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Navigate to="/" /> : element;
};

export default PublicRoute;
