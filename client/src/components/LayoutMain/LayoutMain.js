import React from 'react'

import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const LayoutMain = props => {
  const { children } = props
  return (
    <div className="layout-main">
      <div className="layout-main__navbar">
        <Navbar />
      </div>
      <div className="layout-main__sidebar">
        <Sidebar />
      </div>
      <div className="layout-main__body">
        {children}
      </div>
      <div className="layout-main__footer">
        
      </div>
    </div>
  )
}