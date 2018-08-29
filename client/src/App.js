import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Admin from "./pages/Admin";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Builder from "./pages/Builder";
import User from "./pages/User";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/builder" component={Builder} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/library" component={Library} />
            <Route exact path="/report" component={Report} />
            <Route exact path="/user" component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
