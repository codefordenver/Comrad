import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import DashboardHomePage from '../../pages/DashboardHomePage';

class DashboardRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={DashboardHomePage} />
      </MainLayout>
    );
  }
}

export default DashboardRoutes;
