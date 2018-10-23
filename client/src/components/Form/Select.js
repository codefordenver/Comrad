import React from 'react'

export const Select = props => {
  const { selectOptions, ...rest } = props;

  return (
    <select className="form__select" {...rest}>
      <option disabled selected></option>
      {props.selectOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
