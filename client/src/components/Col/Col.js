import React from 'react'
import classNames from 'classnames'

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs']

const Col = props => {
  const { children, styleName = '', ...rest } = props
  const classes = []

  DEVICE_SIZES.forEach(size => {
    const value = rest[size]

    if (value != null) {
      classes.push(`col-${size}-${value}`)
    }
  })

  return <div className={classNames(styleName, ...classes)}>{children}</div>
}

export default Col
