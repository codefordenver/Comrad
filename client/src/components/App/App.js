import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Home from './pages/Home'
import Main from '../../routes'
import NavTest from '../NavTest'

import LoginRoutes from '../../routes/LoginRoutes'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <Router>
        <div className="app">
        <Switch>
          <Route path="/" component={NavTest} />
          <Route path="/login" component={LoginRoutes} />
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
