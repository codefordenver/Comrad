import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Admin from './pages/Routes/Admin';
import Builder from './pages/Routes/Builder';
import Calendar from './pages/Routes/Calendar';
import Dashboard from './pages/Routes/Dashboard';
import Library from './pages/Routes/Library';
import Report from './pages/Routes/Report';
import User from './pages/Routes/User';

export const Main = () => (
  <div className="main-layout">
    <Navbar />

    <div className="main-layout__body">
      <Sidebar />
      <Route path="/admin" component={Admin} />
      <Route path="/builder" component={Builder} />
      <Route path="/calendar" component={Calendar} />
      <Route exact path="/" component={Dashboard} />
      <Route path="/library" component={Library} />
      <Route path="/report" component={Report} />
      <Route path="/user" component={User} />
    </div>
  </div>
)