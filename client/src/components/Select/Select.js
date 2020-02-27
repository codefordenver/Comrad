import React, { Component } from 'react';
import classnames from 'classnames';
import { InputLabel, InputError } from '../Input';

class Select extends Component {
  render() {
    const { props } = this;

    const {
      className,
      disabled,
      hasBlankOption = true,
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

    // Check if selectOptions variable is object, used for genre list
    const isObj =
      Object.prototype.toString.call(selectOptions) === '[object Object]';

    return (
      <div className={classnames('form-group', className)}>
        <select
          {...input}
          {...other}
          className={classnames('select', touched && error && 'error')}
          disabled={disabled || submitting}
        >
          {hasBlankOption && <option value="" />}
          {isObj
            ? Object.keys(selectOptions).map((option, index) => {
                return (
                  <option key={index} value={selectOptions[option]._id}>
                    {selectOptions[option].name}
                  </option>
                );
              })
            : selectOptions.map((option, index) => {
                return (
                  <option
                    key={index}
                    value={typeof option === 'string' ? option : option.value}
                  >
                    {typeof option === 'string' ? option : option.text}
                  </option>
                );
              }) || null}
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
