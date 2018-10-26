import React from 'react'

export const FormSelect = props => {
  const { className, selectOptions, ...rest } = props;

  return (
    <select className={`form__select ${className ? className : ''}`} {...rest}>
      <option value="" disabled defaultValue></option>
      {selectOptions ? selectOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      )) : null}
    </select>
  )
}
