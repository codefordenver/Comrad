import React from 'react'
import classNames from 'classnames'

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs']

const Col = props => {
  const { children, className, ...rest } = props
  const classes = []

  DEVICE_SIZES.forEach(size => {
    const value = rest[size]
    console.log(value)

    if (value != null) {
      classes.push(`col-${size}-${value}`)
    }
  })

  return <div className={classNames(className, ...classes)}>{children}</div>
}

export default Col
