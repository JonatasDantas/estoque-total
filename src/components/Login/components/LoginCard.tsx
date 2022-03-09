import { Card, CardContent, Tab, Tabs, Box, CardActions, Button } from '@material-ui/core';
import { ParticlesConfig } from 'public/static/ParticlesConfig';
import React, { FunctionComponent, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Particles from 'react-tsparticles';
import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

type PanelType = {
  value: number,
  index: number,
};

const TabPanel: FunctionComponent<PanelType> = (props) => {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      dir="ltr"
      // className={props?.className}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};


const LoginCard: FunctionComponent = () => {
  const [tab, setTab] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => setTab(newValue);
  const handleChangeIndex = (index: number) => setTab(index);

  return (
    <div className="login">
      <Card className="login-card">
        <CardContent>
          <div className="app-logo">
            <img alt="logo" src="/img/logo.png" />
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
            <TabPanel value={tab} index={1}>
              <SignupForm />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <ForgotPasswordForm />
            </TabPanel>
          </SwipeableViews>

        </CardContent>
        <CardActions>
          <Button onClick={() => setTab(2)} size="small">Esqueceu sua senha?</Button>
        </CardActions>
      </Card>
      <Particles options={ParticlesConfig} />
    </div>
  );
};

export default LoginCard;