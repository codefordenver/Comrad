import React, { Component } from 'react';
import { validateSubmit } from '../../utils/validation';

class Form extends Component {
  onSubmit = (e, handleFormSubmit, validate) => {
    e.preventDefault();
    validate ? handleFormSubmit(validateSubmit()) : handleFormSubmit(true);
  };

  render() {
    const {
      children,
      handleFormSubmit,
      styleName = '',
      validate,
      ...rest
    } = this.props;

    return (
      <form
        className={`form ${styleName}`}
        onSubmit={e => this.onSubmit(e, handleFormSubmit, validate)}
        {...rest}
      >
        {children}
      </form>
    );
  }
}

export default Form;
