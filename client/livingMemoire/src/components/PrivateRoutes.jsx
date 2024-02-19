import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoutes = () => {
  const { token } = useAuth();

  console.log("token in private route, ", token)

  return (
    token ? <Outlet/> : <Navigate to={"/signUp"} />
  );
};

export default PrivateRoutes;
