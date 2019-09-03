import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import UserSearchPage from '../../pages/UserSearchPage';
import UserProfilePage from '../../pages/UserProfilePage';
import ChangePasswordPage from '../../pages/ChangePasswordPage/ChangePasswordPage';

import { UserPages } from '../../pages';

class UserRoutes extends Component {
  render() {
    const { url } = this.props.match;
    return (
      <MainLayout {...this.props}>
        <Route exact path={`${url}/add`} component={UserPages.Add} />
        <Route exact path={`${url}/edit`} component={UserPages.Add} />
        <Route exact path={`${url}/search`} component={UserPages.Search} />
        <Switch>
          <Route
            exact
            path={`${url}/profile/change-password`}
            component={ChangePasswordPage}
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
