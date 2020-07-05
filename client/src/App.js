import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  useRouteMatch,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { checkAuth } from './utils/auth';
import { PrivateRoute } from './utils/PrivateRoute';
import { Home } from './components/Home';

checkAuth();
function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route path='/register' component={Register} />

          <Route path='/login' component={Login} />

          <PrivateRoute path='/'>
            <Home />
          </PrivateRoute>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
