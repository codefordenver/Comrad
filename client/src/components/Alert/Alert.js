import React from 'react'

const getIcon = type => {
  switch (type) {
    case 'warning':
      return 'fa-times-circle'
    case 'info':
      return 'fa-info-circle'
    case 'success':
      return 'fa-check-circle'
    case 'error':
      return 'fa-exclamation-circle'
    default:
      return
  }
}

const Alert = props => {
  const { children, styleName, type } = props

  return (
    <div className={`alert alert--${type} ${styleName || ''}`}>
      <div className="alert__symbol">
        <i className={`fas ${getIcon(type)} fa-2x`} />
      </div>
      <div className="alert__body">
        {children}
      </div>
    </div>
  )
}

export default Alert
