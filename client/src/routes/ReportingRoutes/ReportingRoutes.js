import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';

import ReportingLayout from '../../layouts/ReportingLayout';

import ReportingSoundExchangePage from '../../pages/ReportingSoundExchangePage';
import ReportingChartingPage from '../../pages/ReportingChartingPage';
import ReportingUnderwritingPage from '../../pages/ReportingUnderwritingPage';

class ReportRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <ReportingLayout>
          <Route
            exact
            path={`${url}/sound-exchange`}
            component={ReportingSoundExchangePage}
          />
          <Route
            exact
            path={`${url}/charting`}
            component={ReportingChartingPage}
          />
          <Route
            exact
            path={`${url}/underwriting`}
            component={ReportingUnderwritingPage}
          />
        </ReportingLayout>
      </MainLayout>
    );
  }
}

export default ReportRoutes;
