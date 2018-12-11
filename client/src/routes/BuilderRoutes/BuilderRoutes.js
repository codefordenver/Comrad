import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import BuilderHomePage from '../../pages/BuilderHomePage';

class BuilderRoutes extends Component {
  state = {};

  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact page={`${url}/`} component={BuilderHomePage} />
      </MainLayout>
    );
  }
}

export default BuilderRoutes;
