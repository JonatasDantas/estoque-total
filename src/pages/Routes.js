import { useContext, useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { useHistory } from 'react-router';
import { Header } from '../components/Header';
import { Drawer } from '../components/Drawer';

import { Dashboard } from './Dashboard';
import { ProductsWithoutSales } from './ProductsWithoutSales';
import { SecurityStock } from './SecurityStock';
import { Login } from './Login';

import { StoreContext } from '../store';
import { ChangePassword } from './ChangePassword';

import { api } from '../services/api';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const { user, token, webOpen } = useContext(StoreContext);
  const [authenticated, setAuthenticated] = useState(true);

  function handleUnauthorizedUser() {
    history.replace('/');
  }

  api.interceptors.response.use(undefined, (err) => {
    if ([401, 403].indexOf(err.response.status) !== -1 && !err.response.config.url.includes('auth')) {
      handleUnauthorizedUser();
    }

    return Promise.reject(err);
  });

  const isAuthenticated = () => authenticated && token && user;

  async function getAuthentication() {
    try {
      console.log('runnign auth');
      const { data } = await api.get('user/validate-token');
      setAuthenticated(data);
    } catch (error) {
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    getAuthentication();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated() ? (
        <>
          <Header />
          <Drawer />
          <div className={`app ${!webOpen ? 'drawer-web-closed' : ''}`}>
            <Component {...props} />
          </div>
        </>
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ))}
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Login />} />
      <Route path="/trocar-minha-senha" component={() => <ChangePassword />} />
      <PrivateRoute path="/home" component={() => <Dashboard />} />
      <PrivateRoute path="/relatorios/produtos-sem-vendas" component={() => <ProductsWithoutSales />} />
      <PrivateRoute path="/relatorios/estoque-de-segunca" component={() => <SecurityStock />} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
