import React, { Component } from 'react';

import Checkbox from '../../components/Checkbox';

class DashboardHomePage extends Component {
  state = {
    checkboxlabel: 'Test Label',
  };

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
        <div>
          <label>
            <Checkbox label={this.state.checkboxlabel} />
          </label>
        </div>
      </div>
    );
  }
}

export default DashboardHomePage;
