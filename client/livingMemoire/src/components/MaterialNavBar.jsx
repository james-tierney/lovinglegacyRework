import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import logoSVG from '../assets/logo/logo.svg';
import '../styles/materialNavBar.css';
import { useLocation } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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
    <AppBar position="fixed" sx={{ backgroundColor: '#EBF0EE', height: '100px' }}>
      <Toolbar disableGutters>
        {/* <Box sx={{ flexGrow: 1 }}>
          <img src={logoSVG} style={{ width: '20%' }} alt="Logo" className="logo" />
        </Box> */}

        {isMobile && (
          <>
          <img src={logoSVG} style={{ width: '33%' }} alt="Logo" className="logo" />
            <IconButton
              size="large"
              aria-label="menu"
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
            >
              {routes.map((route) => (
                <MenuItem key={route.label} onClick={handleCloseNavMenu}>
                  <Link to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {route.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
        <img src={logoSVG} style={{ width: '20%' }} alt="Logo" className="logo" />
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
          {routes.map((route) => (
            <Link
              key={route.label}
              to={route.path}
              onClick={handleNavigationClick}
              className={`link ${location.pathname === route.path ? 'active' : ''}`}
            >
              {route.label}
            </Link>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: '15px' }}>
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
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MaterialNavBar;
