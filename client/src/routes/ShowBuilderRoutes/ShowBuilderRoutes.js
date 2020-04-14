import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import ShowBuilderShowListPage from '../../pages/ShowBuilderShowListPage';
import ShowBuilderPage from '../../pages/ShowBuilderPage';

class ShowBuilderRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}`} component={ShowBuilderShowListPage} />
        <Route exact path={`${url}/show`} component={ShowBuilderPage} />
      </MainLayout>
    );
  }
}

export default ShowBuilderRoutes;
