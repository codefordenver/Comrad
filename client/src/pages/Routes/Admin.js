import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AdminPage from '../Admin/AdminPage';

class Admin extends Component {
  state = {}

  render() {
    const { url } = this.props.match;

    return (
      <main className="admin">
        <section className="admin__body">
          <Route exact path={`${url}/`} component={AdminPage} />
        </section>
      </main>
    )
  }
}

export default Admin
