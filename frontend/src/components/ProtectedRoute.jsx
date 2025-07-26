import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Check if user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. Check if role is allowed (if `allowedRoles` is specified)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // or redirect to unauthorized pan
  }

  // 3. Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
