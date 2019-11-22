import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../redux/auth';

import NavDevelopmentHelperMenuBar from '../NavDevelopmentHelperMenuBar';

import AdminRoutes from '../../routes/AdminRoutes';
import BuilderRoutes from '../../routes/BuilderRoutes';
import CalendarRoutes from '../../routes/CalendarRoutes';
import DashboardRoutes from '../../routes/DashboardRoutes';
import ErrorRoutes from '../../routes/ErrorRoutes';
import HomeRoutes from '../../routes/HomeRoutes';
import LibraryRoutes from '../../routes/LibraryRoutes';
import ReportRoutes from '../../routes/ReportRoutes';
import ResourceRoutes from '../../routes/ResourceRoutes';
import ShowBuilderRoutes from '../../routes/ShowBuilderRoutes';
import TrafficRoutes from '../../routes/TrafficRoutes';
import UserRoutes from '../../routes/UserRoutes';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentDidMount() {
    const { authActions } = this.props;

    authActions.fetch();
  }

  render() {
    return (
      <Router>
        <div className="app">
          {process.env.REACT_APP_SHOW_DEVELOPMENT_UX_HELPERS && (
            <Route component={NavDevelopmentHelperMenuBar} />
          )}
          <Switch>
            <Route path="/admin" component={AdminRoutes} />
            <Route path="/builder" component={BuilderRoutes} />
            <Route path="/calendar" component={CalendarRoutes} />
            <Route path="/dashboard" component={DashboardRoutes} />
            <Route path="/error" component={ErrorRoutes} />
            <Route path="/library" component={LibraryRoutes} />
            <Route path="/report" component={ReportRoutes} />
            <Route path="/resource" component={ResourceRoutes} />
            <Route path="/show-builder" component={ShowBuilderRoutes} />
            <Route path="/traffic" component={TrafficRoutes} />
            <Route path="/user" component={UserRoutes} />
            <Route component={HomeRoutes} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({ ...authActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(App);
