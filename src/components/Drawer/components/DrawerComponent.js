import { useState } from 'react';
import {
  Avatar,
  Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Typography,
} from '@material-ui/core';

import './DrawerComponent.scss';
import Itens from './DrawerItens';

const drawer = (
  <div>
    <div className="user-info">
      <Avatar>J</Avatar>
      <Typography variant="h6">Jonatas de Almeida</Typography>
      <Typography variant="body2">Web Developer</Typography>
    </div>
    <Divider />
    <List className="drawer-container">
      {Itens.map((item) => (
        <ListItem button key={item.route}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  </div>
);

function DrawerComponent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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
