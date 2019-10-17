import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import TrafficListPage from '../../pages/TrafficListPage';

class TrafficRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={TrafficListPage} />
      </MainLayout>
    );
  }
}

export default TrafficRoutes;
