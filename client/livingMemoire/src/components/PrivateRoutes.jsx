import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoutes = () => {
  const { token } = useAuth();

  return (
    token ? <Outlet/> : <Navigate to={"/signUp"} />
  );
};

export default PrivateRoutes;
