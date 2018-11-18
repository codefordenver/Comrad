import React from 'react'

// import Footer from '../../components/Footer'
import MainRoutes from '../../routes/MainRoutes'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const MainLayout = props => {
  return (
    <div className="main-layout">
      <div className="main-layout__navbar">
        <Navbar />
      </div>
      <div className="main-layout__body">
        <MainRoutes />
      </div>
      <div className="main-layout__sidebar">
        <Sidebar />
      </div>
      <div className="main-layout__footer">
        {/* <Footer /> */}
      </div>
    </div>
  )
}