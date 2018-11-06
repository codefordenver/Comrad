import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

import Home from './pages/Home';
import Main from './routes';

import NavTest from './components/NavTest';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <Router>
        <div>
          {/* Test Navbar for easy navigation during development state */}
          <Route path="/" component={NavTest} />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route component={Main} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(
  null,
  actions
)(App)
