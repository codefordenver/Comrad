import React, { Component } from 'react';
import { validateInput } from '../../utils/validation';
import patterns from '../../utils/validation/patterns';

class Input extends Component {
  myRef = React.createRef();

  componentDidUpdate() {
    const { current } = this.myRef;
    this.toggleActiveClass(current);
  }

  toggleActiveClass(current) {
    const { classList, value } = current;
    if (value.length > 0) {
      return classList.add('active');
    }

    return classList.remove('active');
  }

  render() {
    const { styleName = '', value, validate, ...rest } = this.props;

    return (
      <input ref={this.myRef} className={`input ${styleName}`} {...rest} />
    );
  }
}

export default Input;
