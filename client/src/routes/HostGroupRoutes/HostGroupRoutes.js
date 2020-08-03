import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import HostGroupSearchPage from '../../pages/HostGroupSearchPage';
import HostGroupViewPage from '../../pages/HostGroupViewPage';

class HostGroupRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={HostGroupSearchPage} />
        <Route path={`${url}/:id`} component={HostGroupViewPage} />
      </MainLayout>
    );
  }
}

export default HostGroupRoutes;
