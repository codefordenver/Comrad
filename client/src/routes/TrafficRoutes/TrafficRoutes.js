import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import TrafficAddPage from '../../pages/TrafficAddPage';
import TrafficEditPage from '../../pages/TrafficEditPage';
import TrafficListPage from '../../pages/TrafficListPage';
import TrafficViewPage from '../../pages/TrafficViewPage';

class TrafficRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={TrafficListPage} />
        <Switch>
          <Route exact path={`${url}/add`} component={TrafficAddPage} />
          <Route
            exact
            path={`${url}/:masterTimeId`}
            component={TrafficViewPage}
          />
        </Switch>
        <Route
          exact
          path={`${url}/add/:timeToAddAt`}
          component={TrafficAddPage}
        />
        <Route
          exact
          path={`${url}/edit/:masterTimeOrSeriesId`}
          component={TrafficEditPage}
        />
      </MainLayout>
    );
  }
}

export default TrafficRoutes;
