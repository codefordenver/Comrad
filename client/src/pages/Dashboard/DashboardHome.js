import React, { Component } from 'react';

import MyShowsTable from '../../components/Tables/MyShowsTable';
import PastShowsTable from '../../components/Tables/PastShowsTable';

class DashboardHome extends Component {
  state = {}

  render() { 
    return (
      <div className="dashboard__home">
        <div className="dashboard__shows">
          <h1>My Shows</h1>
          <MyShowsTable />
          <h1>Past Shows</h1>
          <PastShowsTable />
        </div>
        <div className="dashboard__currently-on-air">
          <h1>Currently On Air</h1>
        </div>
      </div>
    )
  }
}

export default DashboardHome;