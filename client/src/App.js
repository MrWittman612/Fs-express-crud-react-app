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

// import UserContext from './content/user/UserContext';
function App() {
  React.useEffect(() => {
    checkAuth();
  }, []);
  return (
    // <UserContext>
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
    // </UserContext>
  );
}

export default App;
