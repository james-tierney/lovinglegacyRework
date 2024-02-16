// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './SignUp';
import UserProfile from './UserProfile';
import BatchQRGeneration from './BatchQRGeneration';
import ProfilePage from './temp/Profile';
import PrivateRoute from './PrivateRoute';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/batchGeneration" element={<BatchQRGeneration />} />
        <PrivateRoute path="/userProfile" element={<UserProfile />} />
        <PrivateRoute path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
