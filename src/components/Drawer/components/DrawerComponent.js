import { useContext } from 'react';
import { useHistory } from 'react-router';
import {
  Avatar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';

import './DrawerComponent.scss';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import Itens from './DrawerItens';
import StoreContext from '../../../store/StoreContext';

function DrawerComponent() {
  const history = useHistory();
  const {
    mobileOpen, setMobileOpen, webOpen, setWebOpen, user,
  } = useContext(StoreContext);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleWebDrawerToggle = () => setWebOpen(!webOpen);

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
        <Typography className="username" variant="h6">{(webOpen || mobileOpen) && user.name}</Typography>
        <Typography variant="body2">{user.roles && (webOpen || mobileOpen) && (user.roles[0].description ?? 'Usuário(a)')}</Typography>
      </div>
      <Divider />
      <List className="drawer-container">
        {Itens.map((item) => {
          if ((item.onlyManager && ['ROLE_COMPANY_MANAGER', 'ROLE_ADMIN'].includes(user.roles[0].name)) || !item.onlyManager) {
            return (
              <ListItem button key={item.route} onClick={() => handleRouteClick(item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={(webOpen || mobileOpen) && item.name} />
              </ListItem>
            );
          }

          return null;
        })}
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
          anchor="left"
          open={webOpen}
          className={`${!webOpen ? 'web-closed' : ''}`}
        >
          <div style={{ display: 'flex', justifyContent: webOpen ? 'flex-end' : 'center', margin: '0 10px' }}>
            <IconButton onClick={handleWebDrawerToggle}>
              {webOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
}

export default DrawerComponent;
