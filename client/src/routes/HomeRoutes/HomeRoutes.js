import React from 'react';
import { Route } from 'react-router-dom';

import HomeLayout from '../../layouts/HomeLayout';
import LoginPage from '../../pages/LoginPage';
import PasswordNewPage from '../../pages/PasswordNewPage';
import PasswordResetPage from '../../pages/PasswordResetPage';
import SignupPage from '../../pages/SignupPage';

const LoginRoutes = props => {
  return (
    <HomeLayout>
      <Route exact path={`/`} component={LoginPage} />
      <Route exact path={`/new`} component={PasswordNewPage} />
      <Route exact path={`/reset`} component={PasswordResetPage} />
      <Route exact path={`/signup`} component={SignupPage} />
    </HomeLayout>
  );
};

export default LoginRoutes;
