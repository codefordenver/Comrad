import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import UserSearch from './UserSearch'
import UserAdd from './UserAdd'

class User extends Component {

  render() {

    const { url } = this.props.match

    return (
      <main className="user">
        <section className="user__body">
          <Switch>
            <Route exact path={`${url}/`} component={UserSearch} />
            <Route path={`${url}/add`} component={UserAdd} />
            <Route path={`${url}/edit/:id`} component={UserAdd} />
          </Switch>
        </section>
      </main>
    )
  }
}

export default User
