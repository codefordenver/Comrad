import React, { Component } from 'react';

class DashboardHomePage extends Component {
  state = {};

  render() {
    return (
      <div className="dashboard__home">
        <div className="dashboard__shows">
          <h1>My Shows</h1>
          <h1>Past Shows</h1>
        </div>
        <div className="dashboard__currently-on-air">
          <h1>Currently On Air</h1>
        </div>
      </div>
    );
  }
}

export default DashboardHomePage;
