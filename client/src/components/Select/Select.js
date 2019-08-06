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
    //const selectOptions = [1,2,3]
    const { error, touched, submitting } = meta;
    const isObj =
      Object.prototype.toString.call(selectOptions) === '[object Object]';
    console.log(Object.keys(selectOptions));

    return (
      <div className={classnames('form-group', className)}>
        <select
          {...input}
          {...other}
          className={classnames('select', touched && error && 'error')}
          disabled={disabled || submitting}
        >
          <option value="" />
          {isObj
            ? Object.keys(selectOptions).map((option, index) => {
                console.log('true');
                console.log(selectOptions[option].name);
                return (
                  <option key={index} value={selectOptions[option]._id}>
                    {selectOptions[option].name}
                  </option>
                );
              })
            : selectOptions.map((option, index) => {
                console.log('false');
                console.log(option);
                return (
                  <option key={index} value={option}>
                    {option}
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
