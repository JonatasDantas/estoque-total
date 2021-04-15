import Particles from 'react-particles-js';
import { ParticlesConfig } from './ParticlesConfig';

import './Login.scss';

const Login = () => (
  <div className="login">
    <Particles params={ParticlesConfig} />
  </div>
);

export default Login;
