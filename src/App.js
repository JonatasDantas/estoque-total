// import { Login } from './pages/Login';

import './App.scss';
import Routes from './pages/Routes';
import { StoreProvider } from './store';

const App = () => (
  <StoreProvider>
    <Routes />
  </StoreProvider>
);

export default App;
