import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
// import requireAdmin from '../../components/HOC/requireAdmin';
import UserAddPage from '../../pages/UserAddPage';
import UserEditPage from '../../pages/UserEditPage';
import UserSearchPage from '../../pages/UserSearchPage';

class UserRoutes extends Component {
  state = {};

  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/add`} component={UserAddPage} />
        <Route exact path={`${url}/edit`} component={UserEditPage} />
        <Route exact path={`${url}/search`} component={UserSearchPage} />
      </MainLayout>
    );
  }
}

export default UserRoutes;
