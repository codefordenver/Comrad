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
  const { title, message, type } = props

  return (
    <div className={`alert alert--${type}`}>
      <div className="alert__symbol">
        <i className={`fas ${getIcon(type)} fa-2x`} />
      </div>
      <div className="alert__body">
        <div className="alert__title">{title}</div>
        <div className="alert__message">{message}</div>
      </div>
    </div>
  )
}

export default Alert
