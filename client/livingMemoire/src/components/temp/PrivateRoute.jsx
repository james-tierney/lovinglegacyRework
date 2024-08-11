import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const PrivateRoute = ({ element: Component, ...rest }) => {
    console.log("Rest... = ", rest);
    const { user } = useContext(AuthContext);

    return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
