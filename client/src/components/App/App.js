import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import LoginRoutes from '../../routes/LoginRoutes'
import NavTest from '../NavTest'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route path="/" component={NavTest} />
          <Route path="/login" component={LoginRoutes} />
          {/* <Route component={Main} /> */}
        </div>
      </Router>
    )
  }
}

export default connect(
  null,
  actions
)(App)
