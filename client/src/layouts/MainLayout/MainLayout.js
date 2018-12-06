import React, { Component } from 'react'

import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <main className="main-layout">
        <section className="main-layout__navbar">
          <Navbar />
        </section>
        <section className="main-layout__sidebar">
          <Sidebar />
        </section>
        <section className="main-layout__body">{children}</section>
        <section className="main-layout__footer">
          <Footer />
        </section>
      </main>
    )
  }
}

export default MainLayout
