import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';

import ReportHomePage from '../../pages/ReportHomePage';

class ReportRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={ReportHomePage} />
      </MainLayout>
    );
  }
}

export default ReportRoutes;
