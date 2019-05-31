import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import ShowBuilderShowListPage from '../../pages/ShowBuilderShowListPage';

class ShowBuilderRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}`} component={ShowBuilderShowListPage} />
      </MainLayout>
    );
  }
}

export default ShowBuilderRoutes;
