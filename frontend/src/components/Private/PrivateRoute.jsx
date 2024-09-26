import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust path accordingly

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner or placeholder while checking auth
  if (loading) {
    return <div>Loading...</div>
  }

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Render the protected component if authenticated
  return children;
};

export default PrivateRoute;