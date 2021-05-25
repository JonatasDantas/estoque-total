import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Avatar,
  Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Typography,
} from '@material-ui/core';

import './DrawerComponent.scss';
import Itens from './DrawerItens';
import StoreContext from '../../../store/StoreContext';

function DrawerComponent() {
  const history = useHistory();
  const { mobileOpen, setMobileOpen, user } = useContext(StoreContext);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleRouteClick = (route) => {
    history.replace(route);

    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <div>
      <div className="user-info">
        <Avatar>{user.name.charAt(0)}</Avatar>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2">{user.role && user.role.find((e) => e.authority === 'ROLE_ADMIN') ? 'Administrador(a)' : 'Usuário'}</Typography>
      </div>
      <Divider />
      <List className="drawer-container">
        {Itens.map((item) => (
          <ListItem button key={item.route} onClick={() => handleRouteClick(item.route)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          container={window.document.body}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
}

export default DrawerComponent;
