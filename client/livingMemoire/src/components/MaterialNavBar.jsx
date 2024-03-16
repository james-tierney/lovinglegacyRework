import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logoSVG from '../assets/logo/logo.svg'
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import '../styles/materialNavBar.css';
import { useLocation } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



function MaterialNavBar({routes, handleNavigationClick}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  console.log("location in material nav bar = ", location.pathname);

//   const routes = [
//     { path: '/', label: 'Home' },
//     { path: '/singUp', label: 'Sign Up' },
//     { path: '/login', label: 'Login' }, 
//     { path: '/batchGeneration', label: 'Batch QR Generation' },
//     { path: '/qrCode', label: 'QR Code' },
//     { path: '/userProfile', label: 'User Profile' },
//     { path: '/profile', label: 'Profile Page' },
//   ]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // nav bar color #EBF0EE
  return (
    <AppBar position="fixed" sx={{backgroundColor: '#EBF0EE', height: '100px',}} >   
      

        
      {/* <Container maxWidth="xl"> */}
        <Toolbar disableGutters>
        <img 
          src={logoSVG} 
          alt="Logo" 
          className="logo" 
          
          />
   

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
<Box   
    sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'space-between',
    }}
>
    {routes.map((route, index) => (
        <Link key={index}
            to={route.path}
            onClick={handleNavigationClick}
            className={`link ${location.pathname === route.path ? 'active' : ''}`}
 sx={{
        textDecoration: 'none',
        backgroundColor: 'red',
        color: '#838383',
        marginRight: '10px',
        '&:last-child': {
            marginRight: 0,
        },
        '&:hover': {
            textDecoration: 'underline',
            color: '#C9B292',
        },
        '&.MuiLink-root': { // Adding more specificity
            color: '#838383',
        },
        '&.MuiLink-root:hover': { // Adding more specificity for hover state
            color: '#C9B292',
        },
    }}
        >
            {route.label}
        </Link>
    ))}

     <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: '15px'}}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
      </Box>


          <Box sx={{ flexGrow: 0 }}>
           
          </Box>
        </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
export default MaterialNavBar;