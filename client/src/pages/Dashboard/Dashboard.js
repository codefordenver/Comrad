import React, { Component } from 'react';
import requireAuth from '../../components/HOC/requireAuth';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div>Dashboard Component - Welcome {this.props.auth.email}</div> 
    )
  }
}

export default requireAuth(Dashboard);