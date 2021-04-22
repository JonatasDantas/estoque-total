import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { Header } from '../components/Header';
import { Drawer } from '../components/Drawer';

import { Dashboard } from './Dashboard';
import { Login } from './Login';

function isAuthenticated() {
  return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
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

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Login />} />
      <PrivateRoute path="/app" component={() => <Dashboard />} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
