import React, { Component } from 'react';
import requireAuth from '../../components/HOC/requireAuth';
import CurrentOnAir from '../../components/CurrentOnAir/CurrentOnAir';
import MyShows from '../../components/MyShows/MyShows';
import PastShows from '../../components/PastShows/PastShows';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div className="dashboard-grid">
      <div>Dashboard Component - Welcome {this.props.auth.email}</div>
      <MyShows />
      <CurrentOnAir />
      <PastShows />
      </div>
    )
  }
}

export default requireAuth(Dashboard);
