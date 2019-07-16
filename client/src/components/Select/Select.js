import React, { Component } from 'react';
import classnames from 'classnames';
import { InputLabel, InputError } from '../Input';

class Select extends Component {
  render() {
    const { props } = this;

    const {
      className,
      disabled,
      input,
      label,
      meta = {
        error: false,
        touched: false,
        submitting: false,
      } /* default values for when component is not used within React Form */,
      selectOptions,
      ...other
    } = props;
    const { error, touched, submitting } = meta;

    return (
      <div className={classnames('form-group', className)}>
        <select
          {...input}
          {...other}
          className={classnames('select', touched && error && 'error')}
          disabled={disabled || submitting}
        >
          <option value="" />
          {selectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          )) || null}
        </select>

        {label && (
          <InputLabel {...meta} dirtyOverride={true}>
            {label}
          </InputLabel>
        )}
        {touched && error && <InputError>{error}</InputError>}
      </div>
    );
  }
}

export default Select;
