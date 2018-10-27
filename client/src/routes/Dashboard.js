import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import requireAuth from '../components/HOC/requireAuth';

import DashboardHome from '../pages/Dashboard/DashboardHome';

class Dashboard extends Component {
  state = {}

  render() {
    const { url } = this.props.match

    return (
      <main className="dasbhoard">
        <section className="dashboard__body">
          <Route exact path={`${url}/`} component={DashboardHome} />
        </section>
      </main>
    )
  }
}

export default requireAuth(Dashboard)
