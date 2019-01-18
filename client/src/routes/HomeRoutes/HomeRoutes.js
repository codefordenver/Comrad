import React from 'react';
import { Route } from 'react-router-dom';

import HomeLayout from '../../layouts/HomeLayout';
import LoginPage from '../../pages/LoginPage';
import ResetPage from '../../pages/ResetPage';
import SignupPage from '../../pages/SignupPage';

const LoginRoutes = props => {
  return (
    <HomeLayout>
      <Route exact path={`/`} component={LoginPage} />
      <Route exact path={`/reset`} component={ResetPage} />
      <Route exact path={`/signup`} component={SignupPage} />
    </HomeLayout>
  );
};

export default LoginRoutes;
