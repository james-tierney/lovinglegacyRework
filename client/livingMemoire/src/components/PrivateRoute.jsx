import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signup" replace/>  // Redirect to signup page if token doesn't exist
        )
      }
    />
  );
};

export default PrivateRoute;