import React, { Fragment } from 'react'

import AdminRoutes from '../AdminRoutes'
import BuilderRoutes from '../BuilderRoutes'
import CalendarRoutes from '../CalendarRoutes'
import DashboardRoutes from '../DashboardRoutes'
import LibraryRoutes from '../LibraryRoutes'
import ReportRoutes from '../ReportRoutes'
import UserRoutes from '../UserRoutes'

const MainRoutes = props => {
  return (
    <Fragment>
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/builder" component={BuilderRoutes} />
      <Route path="/calendar" component={CalendarRoutes} />
      <Route exact path="/" component={DashboardRoutes} />
      <Route path="/library" component={LibraryRoutes} />
      <Route path="/report" component={ReportRoutes} />
      <Route path="/user" component={UserRoutes} />
    </Fragment>
  )
}

export default MainRoutes
