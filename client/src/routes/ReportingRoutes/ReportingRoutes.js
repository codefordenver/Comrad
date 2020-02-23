import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';

import ReportingHomePage from '../../pages/ReportingHomePage';

class ReportRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={ReportingHomePage} />
      </MainLayout>
    );
  }
}

export default ReportRoutes;
