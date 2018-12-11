import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import AuthLayout from '../../layouts/AuthLayout';
import LoginPage from '../../pages/LoginPage';

const LoginRoutes = props => {
  const { url } = props.match;

  return (
    <AuthLayout>
      <Route exact path={`${url}/`} component={LoginPage} />
    </AuthLayout>
  );
};

export default LoginRoutes;
