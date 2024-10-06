import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Loader from '../Loader/Loader';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, loading, user, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      checkAuth();
    }
  }, [loading, isAuthenticated, checkAuth]);

  if (loading) {
    return (
     <>
     <Loader/>
     </>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && (!user || user.role !== requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}