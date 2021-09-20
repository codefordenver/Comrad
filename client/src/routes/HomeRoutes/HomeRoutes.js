import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeLayout from '../../layouts/HomeLayout';
import LoginPage from '../../pages/LoginPage';
import PasswordNewPage from '../../pages/PasswordNewPage';
import PasswordResetPage from '../../pages/PasswordResetPage';
import DevelopmentSignupPage from '../../pages/DevelopmentSignupPage';

import NotFoundPage from '../../pages/NotFoundPage';

const LoginRoutes = props => {
  return (
    <HomeLayout {...props}>
      <Switch>
        <Route exact path={`/`} component={LoginPage} />
        <Route exact path={`/new`} component={PasswordNewPage} />
        <Route exact path={`/reset`} component={PasswordResetPage} />
        {process.env.REACT_APP_SHOW_DEVELOPMENT_SIGN_UP === 'true' && (
          <Route exact path={`/signup`} component={DevelopmentSignupPage} />
        )}
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </HomeLayout>
  );
};

export default LoginRoutes;
