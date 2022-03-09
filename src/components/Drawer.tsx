import { Avatar, Divider, Hidden, List, ListItem, ListItemIcon, ListItemText, Typography, Drawer, IconButton } from '@material-ui/core';
import { Assignment, BarChart, ChevronLeft, ChevronRight, Home, PieChart, Settings, TrendingUp } from '@material-ui/icons';
import Router from 'next/router';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { ThemeContext } from 'src/contexts/ThemeContext';

const Itens = [
  {
    name: 'Home',
    icon: <Home />,
    route: '/home',
  },
  {
    name: 'Produtos sem vendas',
    icon: <BarChart />,
    route: '/reports/products-without-sales',
  },
  {
    name: 'Estoque de Segurança',
    icon: <Assignment />,
    route: '/relatorios/estoque-de-segunca',
  },
  {
    name: 'Relatório 2',
    icon: <TrendingUp />,
    route: '/relatorio-2',
  },
  {
    name: 'Relatório 3',
    icon: <PieChart />,
    route: '/relatorio-3',
  },
  {
    name: 'Configurações',
    icon: <Settings />,
    route: '/ajustes',
  },
];

const DrawerComponent: FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  const { mobileOpen, setMobileOpen, webOpen, setWebOpen } = useContext(ThemeContext);
  const [webDrawerContainer, setWebDrawerContainer] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    setWebDrawerContainer(window.document.body);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleWebDrawerToggle = () => setWebOpen(!webOpen);

  const handleRouteClick = (route: string) => {
    console.log(mobileOpen);
    console.log(setMobileOpen);

    Router.push(route);

    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <>
      <div className="user-info">
        <Avatar>{user?.name.charAt(0)}</Avatar>
        <Typography className="username" variant="h6">{(webOpen || mobileOpen) && user?.name}</Typography>
        <Typography variant="body2">{user?.role && (webOpen || mobileOpen) && (user?.role.find((e) => e.authority === 'ROLE_ADMIN') ? 'Administrador(a)' : 'Usuário')}</Typography>
      </div>
      <Divider />
      <List className="drawer-container">
        {Itens.map((item) => (
          <ListItem button key={item.route} onClick={() => handleRouteClick(item.route)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={(webOpen || mobileOpen) && item.name} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          container={webDrawerContainer}
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
};

export default DrawerComponent;