import React, { Component } from 'react';
import requireAuth from '../../components/HOC/requireAuth';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <main className="dashboard">Dashboard Component - Welcome {this.props.auth.email}</main> 
    )
  }
}

export default requireAuth(Dashboard);