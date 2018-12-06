import React from 'react'

const Form = props => {
  const { children, styleName, ...rest } = props

  return (
    <form className={`form ${styleName || ''}`} {...rest}>
      {children}
    </form>
  )
}

export default Form
