import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

import NavTest from './components/NavTest'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Admin from './pages/Admin'
import Calendar from './pages/Calendar'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import Home from './pages/Home'
import Report from './pages/Report'
import Builder from './pages/Builder'
import User from './pages/User'

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />

      <div className="main-layout__body">
        <Sidebar />
        <Route path="/admin" component={Admin} />
        <Route path="/builder" component={Builder} />
        <Route path="/calendar" component={Calendar} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/library" component={Library} />
        <Route path="/report" component={Report} />
        <Route path="/user" component={User} />
      </div>
    </div>
  )
}

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
            <Route component={MainLayout} />
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
