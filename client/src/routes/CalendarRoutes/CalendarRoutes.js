import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import CalendarHomePage from '../../pages/CalendarHomePage';

class CalendarRoutes extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={CalendarHomePage} />
      </MainLayout>
    );
  }
}

export default CalendarRoutes;
