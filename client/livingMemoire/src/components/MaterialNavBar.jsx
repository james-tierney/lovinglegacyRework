import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon (Hamburger)
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import logoSVG from '../assets/logo/logo.svg';
import '../styles/materialNavBar.css';
import { useLocation } from 'react-router-dom';

function MaterialNavBar({ routes, handleNavigationClick }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

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

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#EBF0EE', height: isMobile ? '50px' : '100px' }}>
      <Toolbar disableGutters style={{ height: '100%' }}>
        {isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
            <img src={logoSVG} style={{ width: '20%' }} alt="Logo" className="logo" />
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
              sx={{ marginLeft: 'auto' }} // Align to the right
            >
              <MenuIcon /> {/* Hamburger Icon */}
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
            >
              {routes.map((route) => (
                <MenuItem key={route.label} onClick={handleCloseNavMenu}>
                  <Link to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {route.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* Centered logo */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <img src={logoSVG} style={{ height: '60px' }} alt="Logo" className="logo" />
            </Box>

            {/* Right-aligned avatar and settings */}
            <Box sx={{ position: 'absolute', right: 16 }}>
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="black"
                  sx={{ marginLeft: 'auto' }} // Align to the right
                >
                  <MenuIcon /> {/* Hamburger Icon */}
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
                {routes.map((route) => (
                  <MenuItem key={route.label} onClick={handleCloseUserMenu}>
                    <Link to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {route.label}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MaterialNavBar;
