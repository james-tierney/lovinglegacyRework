import React, { useEffect, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PrivateRoutes = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const auth = getAuth();


  useEffect(() => {
    console.log("auth in use Effect ", auth.currentUser);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  console.log("token in private route, ", token)
  console.log("user in private route ", user);
  return (
    user ? <Outlet/> : <Navigate to={"/login"} />
    // add a button to navigate to sign in page at login page!
  );
};

export default PrivateRoutes;
