import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import ChangePasswordPage from '../../pages/ChangePasswordPage/ChangePasswordPage';

import { UserAddEditPage, UserProfilePage, UserSearchPage } from '../../pages';

// import { UserPages } from '../../pages';

class UserRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout {...this.props}>
        <Route exact path={`${url}/add`} component={UserAddEditPage} />
        <Route exact path={`${url}/search`} component={UserSearchPage} />
        <Switch>
          <Route
            exact
            path={`${url}/profile/change-password`}
            component={ChangePasswordPage}
          />
          <Route
            exact
            path={`${url}/profile/edit/:id`}
            component={UserAddEditPage}
          />
          <Route
            exact
            path={`${url}/profile/:id`}
            component={UserProfilePage}
          />
        </Switch>
      </MainLayout>
    );
  }
}

export default UserRoutes;
