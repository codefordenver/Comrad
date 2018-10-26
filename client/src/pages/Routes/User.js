import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import UserAdd from '../User/UserAdd'
import UserSearch from '../User/UserSearch'

class User extends Component {
  state = {}

  render() {
    const { url } = this.props.match
    
    return (
      <main className="user">
        <section className="user__body">
          <Route exact path={`${url}/`} component={UserSearch} />
          <Route path={`${url}/add`} component={UserAdd} />
        </section>
      </main>
    )
  }
}

export default User;
