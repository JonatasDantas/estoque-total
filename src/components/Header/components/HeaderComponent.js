import { useState } from 'react';
import {
  AppBar, IconButton, Menu, MenuItem, Toolbar,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import Logo from '../../../assets/img/logo-transparente.png';
import './HeaderComponent.scss';

function HeaderComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <img edge="start" className="app-logo" alt="logo" src={Logo} />

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
