import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import LoginPage from '../../pages/LoginPage'
import Error404Page from '../../pages/Error404Page'

const LoginRoutes = props => {
  const { url } = props.match

  return (
    <Fragment>
      <Route exact path={`${url}/`} component={LoginPage} />
      <Route exact path={`${url}/test`} component={Error404Page} />
    </Fragment>
  )
}

export default LoginRoutes