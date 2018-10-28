import React from 'react'

export const FormLabel = props => {
  const { text } = props

  return <label className="form__label">{text}</label>
}
