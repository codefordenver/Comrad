import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AdminHomePage from '../../pages/AdminHomePage'

const AdminRoutes = props => {
  const { url } = props.match

  return (
    <main className="admin">
      <Route exact path={`${url}/`} component={AdminHomePage} />
    </main>
  )
}

export default AdminRoutes
