import { useContext } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { Header } from '../components/Header';
import { Drawer } from '../components/Drawer';

import { Dashboard } from './Dashboard';
import { ProductsWithoutSales } from './ProductsWithoutSales';
import { Login } from './Login';

import { StoreContext } from '../store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(StoreContext);

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
          <div className="app">
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
      <PrivateRoute path="/home" component={() => <Dashboard />} />
      <PrivateRoute path="/relatorios/produtos-sem-vendas" component={() => <ProductsWithoutSales />} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
