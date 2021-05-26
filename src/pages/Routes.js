import { useContext } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { Header } from '../components/Header';
import { Drawer } from '../components/Drawer';

import { Dashboard } from './Dashboard';
import { ProductsWithoutSales } from './ProductsWithoutSales';
import { SecurityStock } from './SecurityStock';
import { Login } from './Login';

import { StoreContext } from '../store';
import { ChangePassword } from './ChangePassword';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token, webOpen } = useContext(StoreContext);

  function isAuthenticated() {
    return token;
  }

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
