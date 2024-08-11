// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './SignUp';
import UserProfile from './UserProfile';
import BatchQRGeneration from './BatchQRGeneration';
import ProfilePage from './temp/Profile';
import PrivateRoutes from './PrivateRoutes';
import Login from './Login';
import QRCode from './QRCode';
import ProfileSettings from './profileSettings/ProfileSettings';
import HomeInfo from './HomeInfo';
import ProfilePageTester from './Profile/ProfilePage';
import authTest from './temp/authTest';
import PrivateRoute from './temp/PrivateRoute';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/batchGeneration" element={<BatchQRGeneration />} />
        <Route path="/qrCode" element={<QRCode />} />
        <Route path="/info" element={<HomeInfo />} />
        {/* <Route path="/userProfile" element={<UserProfile />} /> */}
        {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/userProfile" element={<UserProfile/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/profileTester" element={<ProfilePageTester />} />
            <Route path="/test" element={<PrivateRoute element={authTest} />} />
        
        {/* </Route> */}
        
        {/* <Route 
          path="/userProfile"
          element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
          }
        /> */}
        {/* <Route 
          path="/profile"
          element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
