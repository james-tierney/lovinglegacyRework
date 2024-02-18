import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      element={token ? children : <Navigate to="/signup" replace />}
    />
  );
};

export default PrivateRoute;
