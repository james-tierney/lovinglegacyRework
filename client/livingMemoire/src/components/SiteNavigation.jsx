// Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MaterialNavBar from './MaterialNavBar';
import { useMediaQuery, useTheme } from '@mui/material';



const routes = [
  { path: '/', label: 'Home' },
  { path: '/signUp', label: 'Sign Up' },
  { path: '/login', label: 'Login' },
  { path: '/batchGeneration', label: 'Batch QR Generation' },
  { path: '/qrCode', label: 'QR Code' },
  { path: '/userProfile', label: 'User Profile' },
  { path: '/profile', label: 'Profile Page' },
  { path: '/settings', label: 'Settings'}
];

const SiteNavigation = ({ setIsNavigatedByApp }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // func to handle nav click
    const handleNavigationClick = () => {
        // Set the flag indicating navigation initiated by app in local storge
        localStorage.setItem('isNavigatedByApp', true);
        // Inform UserProfile component that navigation was initiated by the app
        setIsNavigatedByApp(true);
    }

  return (
    
    <div style={{padding: isMobile ? '0px' : '0px'}}>
      <MaterialNavBar routes={routes} handleNavigationClick={handleNavigationClick}/>
    </div>
    // <nav className="border-b mb-4">
    //   <ul className="flex space-x-6 p-4">
    //     {routes.map(route => (
    //       <li key={route.path}>
    //         <Link to={route.path} onClick={handleNavigationClick}>{route.label}</Link>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
  );
};


export default SiteNavigation;
