import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import AdminHomePage from '../../pages/AdminHomePage'

const AdminRoutes = props => {
  const { url } = props.match
  console.log('url ', url)

  return (
    <MainLayout>
      <Route exact path={`${url}/`} component={AdminHomePage} />
    </MainLayout>
  )
}

export default AdminRoutes
