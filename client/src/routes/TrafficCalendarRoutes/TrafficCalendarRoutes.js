import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import TrafficCalendarHomePage from '../../pages/TrafficCalendarPage';

class TrafficCalendarRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={TrafficCalendarHomePage} />
      </MainLayout>
    );
  }
}

export default TrafficCalendarRoutes;
