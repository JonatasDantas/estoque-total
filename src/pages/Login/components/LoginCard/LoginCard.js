import { useState } from 'react';
import {
  Box,
  Button,
  Card, CardActions, CardContent, Tab, Tabs,
} from '@material-ui/core';

import SwipeableViews from 'react-swipeable-views';
import Particles from 'react-particles-js';
import { ParticlesConfig } from './ParticlesConfig';

import './LoginCard.scss';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';

import Logo from '../../../../assets/img/logo.PNG';

function LoginCard() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => setTab(newValue);
  const handleChangeIndex = (index) => setTab(index);

  return (
    <div className="login">
      <Card className="login-card">
        <CardContent>
          <div className="app-logo">
            <img alt="logo" src={Logo} />
          </div>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Login" />
            <Tab label="Cadastrar-se" />
          </Tabs>

          <SwipeableViews
            className="card-views"
            axis="x"
            index={tab}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={tab} index={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel className="tabpanel" value={tab} index={1}>
              <SignupForm />
            </TabPanel>
          </SwipeableViews>
        </CardContent>
        <CardActions>
          <Button size="small">Esqueceu sua senha?</Button>
        </CardActions>
      </Card>
      <Particles params={ParticlesConfig} />
    </div>
  );
}

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      dir="ltr"
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default LoginCard;
