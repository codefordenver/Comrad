import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import BuilderHomePage from '../../pages/BuilderHomePage'

const BuilderRoutes = props => {
  const { url } = this.props.match

  return (
    <main className="builder">
      <Route exact page={`${url}/`} component={BuilderHomePage} />
    </main>
  )
}

export default BuilderRoutes
