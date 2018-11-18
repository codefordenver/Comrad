import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import LoginPage from '../../pages/LoginPage'

const LoginRoutes = props => {
  return (
    <Fragment>
      <Route path="/" component={LoginPage} />
    </Fragment>
  )
}