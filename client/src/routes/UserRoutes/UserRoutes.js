import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import UserAddPage from '../../pages/UserAddPage'
import UserSearchPage from '../../pages/UserSearchPage'

const UserRoutes = props => {
  const { url } = this.props.match
  
  return (
    <main className="user">
      <section className="user__body">
        <Route exact path={`${url}/`} component={UserSearchPage} />
        <Route path={`${url}/add`} component={UserAddPage} />
      </section>
    </main>
  )
}

export default UserRoutes;
