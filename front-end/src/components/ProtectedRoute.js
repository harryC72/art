import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ Component, user, logout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.role === 'Admin') {
          return <Component logout={logout} />;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};
