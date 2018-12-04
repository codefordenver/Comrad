import React, { Component } from 'react'

import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="main-layout">
        <div className="main-layout__navbar">
          <Navbar />
        </div>
        <div className="main-layout__sidebar">
          <Sidebar />
        </div>
        <div className="main-layout__body">{children}</div>
        <div className="main-layout__footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export default MainLayout
