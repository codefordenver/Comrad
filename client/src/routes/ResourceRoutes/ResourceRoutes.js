import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import ResourceLayout from '../../layouts/ResourceLayout';

import ResourcePermissionsPage from '../../pages/ResourcePermissionsPage';
import ResourcePoliciesPage from '../../pages/ResourcePoliciesPage';
import ResourceStationRulesPage from '../../pages/ResourceStationRulesPage';

class ResourcesRoute extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout {...this.props}>
        <ResourceLayout {...this.props}>
          <Route exact path={`${url}`} component={ResourcePoliciesPage} />
          <Route
            exact
            path={`${url}/permissions`}
            component={ResourcePermissionsPage}
          />
          <Route
            exact
            path={`${url}/station-rules`}
            component={ResourceStationRulesPage}
          />
        </ResourceLayout>
      </MainLayout>
    );
  }
}

export default ResourcesRoute;
