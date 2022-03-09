import { AppBar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { FunctionComponent, useContext, useState } from 'react';
import { MobileView } from 'react-device-detect';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle, Person, Settings } from '@material-ui/icons';
import { AuthContext } from 'src/contexts/AuthContext';
import { ThemeContext } from 'src/contexts/ThemeContext';


const Header: FunctionComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const { mobileOpen, setMobileOpen } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => logout();

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
        <img className="app-logo" alt="logo" src="/img/logo-transparent.png" />
    
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
            className="user-menu-appbar"
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
            <div className="user-info">
              <div className="user-details">
                <span>{user && user.name}</span>
                <span>{user && user.role && (user.role.find((e) => e.authority === 'ROLE_ADMIN') ? 'Administrador(a)' : 'Usuário')}</span>
              </div>
              <Divider />
            </div>
            <MenuItem onClick={handleMenuClose} style={{ marginTop: 10 }}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
                  Minha Conta
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
                  Configurações
            </MenuItem>
    
            <div className="button-group">
              <Button variant="contained" color="primary" onClick={handleLogout}>
                    Logout
              </Button>
            </div>
    
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;