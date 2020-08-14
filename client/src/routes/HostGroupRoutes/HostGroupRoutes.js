import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import HostGroupEditPage from '../../pages/HostGroupEditPage';
import HostGroupSearchPage from '../../pages/HostGroupSearchPage';
import HostGroupViewPage from '../../pages/HostGroupViewPage';

class HostGroupRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={HostGroupSearchPage} />
        <Switch>
          <Route path={`${url}/:id/edit`} component={HostGroupEditPage} />
          <Route path={`${url}/:id`} component={HostGroupViewPage} />
        </Switch>
      </MainLayout>
    );
  }
}

export default HostGroupRoutes;
