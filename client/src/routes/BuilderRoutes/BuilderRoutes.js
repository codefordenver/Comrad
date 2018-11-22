import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import BuilderHomePage from '../../pages/BuilderHomePage'

const BuilderRoutes = props => {
  const { url } = props.match

  return (
    <MainLayout>
      <Route exact page={`${url}/`} component={BuilderHomePage} />
    </MainLayout>
  )
}

export default BuilderRoutes
