import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import Admin from './Admin';
import Builder from './Builder';
import Calendar from './Calendar';
import Dashboard from './Dashboard';
import Library from './Library';
import Report from './Report';
import User from './User';

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