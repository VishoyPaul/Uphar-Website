import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import FadingLoader from './loader/FadingLoader';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <FadingLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectPath = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectPath)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
