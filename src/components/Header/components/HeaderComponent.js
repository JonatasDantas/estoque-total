import { useContext, useState } from 'react';
import { MobileView } from 'react-device-detect';
import {
  AppBar, IconButton, Menu, MenuItem, Toolbar,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';

import './HeaderComponent.scss';
import StoreContext from '../../../store/StoreContext';

import Logo from '../../../assets/img/logo-transparente.png';

function HeaderComponent() {
  const { mobileOpen, setMobileOpen } = useContext(StoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <MobileView>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </MobileView>
        <img className="app-logo" alt="logo" src={Logo} />

        <div className="user-menu">
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderComponent;
