import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../redux/auth';

import NavDevelopmentHelperMenuBar from '../NavDevelopmentHelperMenuBar';

import AdminRoutes from '../../routes/AdminRoutes';
import CalendarRoutes from '../../routes/CalendarRoutes';
import DashboardRoutes from '../../routes/DashboardRoutes';
import ErrorRoutes from '../../routes/ErrorRoutes';
import HomeRoutes from '../../routes/HomeRoutes';
import HostGroupRoutes from '../../routes/HostGroupRoutes';
import LibraryRoutes from '../../routes/LibraryRoutes';
import ReportingRoutes from '../../routes/ReportingRoutes';
import ResourcesRoutes from '../../routes/ResourcesRoutes';
import ShowBuilderRoutes from '../../routes/ShowBuilderRoutes';
import TrafficRoutes from '../../routes/TrafficRoutes';
import TrafficCalendarRoutes from '../../routes/TrafficCalendarRoutes';
import UserRoutes from '../../routes/UserRoutes';
import { bindActionCreators } from 'redux';

import NotFoundPage from '../../pages/NotFoundPage';

class App extends Component {
  componentDidMount() {
    const { authActions } = this.props;

    authActions.fetch();
  }

  render() {
    return (
      <Router>
        <div className="app">
          {process.env.REACT_APP_SHOW_DEVELOPMENT_UX_HELPERS === 'true' && (
            <Route component={NavDevelopmentHelperMenuBar} />
          )}
          <Switch>
            <Route path="/admin" component={AdminRoutes} />
            <Route path="/calendar" component={CalendarRoutes} />
            <Route path="/dashboard" component={DashboardRoutes} />
            <Route path="/error" component={ErrorRoutes} />
            <Route path="/host-group" component={HostGroupRoutes} />
            <Route path="/library" component={LibraryRoutes} />
            <Route path="/traffic-calendar" component={TrafficCalendarRoutes} />
            <Route path="/reporting" component={ReportingRoutes} />
            <Route path="/resources" component={ResourcesRoutes} />
            <Route path="/show-builder" component={ShowBuilderRoutes} />
            <Route path="/traffic" component={TrafficRoutes} />
            <Route path="/user" component={UserRoutes} />
            <Route component={HomeRoutes} />
            <Route path="*">
              <NotFoundPage />
            </Route>
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

export default connect(null, mapDispatchToProps)(App);
