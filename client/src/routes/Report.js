import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ReportPage from  '../pages/Report/ReportPage';

class Report extends Component {
  state = {};

  render() {
    const { url } = this.props.match;
    
    return (
      <main className="report">
        <section className="report__body">
          <Route exact path={`${url}/`} component={ReportPage} />
        </section>
      </main>
    )
  }
}

export default Report;