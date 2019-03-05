import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import AdminHomePage from '../../pages/AdminHomePage';

class AdminRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={AdminHomePage} />
      </MainLayout>
    );
  }
}

export default AdminRoutes;
