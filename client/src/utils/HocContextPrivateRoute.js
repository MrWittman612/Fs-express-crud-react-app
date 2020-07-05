import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../content/user/UserContext';

const HocContextPrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default HocContextPrivateRoute;
