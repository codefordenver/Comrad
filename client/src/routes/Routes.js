import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

import AdminRoutes from './AdminRoutes'
import BuilderRoutes from './BuilderRoutes'
import CalendarRoutes from './CalendarRoutes'
import DashboardRoutes from './DashboardRoutes'
import LibraryRoutes from './LibraryRoutes'
import ReportRoutes from './ReportRoutes'
import UserRoutes from './UserRoutes'

const Routes = () => {
  return (
    <div className="main-layout">
      <Navbar />
  
      <div className="main-layout__body">
        <Sidebar />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/builder" component={BuilderRoutes} />
        <Route path="/calendar" component={CalendarRoutes} />
        <Route exact path="/" component={DashboardRoutes} />
        <Route path="/library" component={LibraryRoutes} />
        <Route path="/report" component={ReportRoutes} />
        <Route path="/user" component={UserRoutes} />
      </div>
    </div>
  ) 
}

export default Routes
