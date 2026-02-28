import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Redirecting to login...</div>;
  }

  return children;
};

export default ProtectedRoute;
