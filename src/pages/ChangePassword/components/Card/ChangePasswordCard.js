import { Card, CardContent } from '@material-ui/core';
import Particles from 'react-particles-js';

import Logo from '../../../../assets/img/logo.PNG';
import ChangePasswordForm from '../Form/ChangePasswordForm';
import { ParticlesConfig } from '../../../Login/components/LoginCard/ParticlesConfig';

import './ChangePasswordCard.scss';

function ChangePassword() {
  return (
    <div className="change-password">
      <Card className="password-card">
        <CardContent>
          <div className="app-logo">
            <img alt="logo" src={Logo} />
          </div>

          <div className="card-view">
            <ChangePasswordForm />
          </div>
        </CardContent>
      </Card>
      <Particles params={ParticlesConfig} />
    </div>
  );
}
export default ChangePassword;
