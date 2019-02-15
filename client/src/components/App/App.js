import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';

import NavTest from '../NavTest';

import AdminRoutes from '../../routes/AdminRoutes';
import BuilderRoutes from '../../routes/BuilderRoutes';
import CalendarRoutes from '../../routes/CalendarRoutes';
import DashboardRoutes from '../../routes/DashboardRoutes';
import ErrorRoutes from '../../routes/ErrorRoutes';
import HomeRoutes from '../../routes/HomeRoutes';
import LibraryRoutes from '../../routes/LibraryRoutes';
import ReportRoutes from '../../routes/ReportRoutes';
import UserRoutes from '../../routes/UserRoutes';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route component={NavTest} />
          <Switch>
            <Route path="/admin" component={AdminRoutes} />
            <Route path="/builder" component={BuilderRoutes} />
            <Route path="/calendar" component={CalendarRoutes} />
            <Route path="/dashboard" component={DashboardRoutes} />
            <Route path="/error" component={ErrorRoutes} />
            <Route path="/library" component={LibraryRoutes} />
            <Route path="/report" component={ReportRoutes} />
            <Route path="/user" component={UserRoutes} />
            <Route component={HomeRoutes} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  { fetchUser },
)(App);
