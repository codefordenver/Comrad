import React, { Component } from 'react';

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
    const { myRef, props } = this;
    const { styleName = '', ...rest } = props;

    return <input ref={myRef} className={`input ${styleName}`} {...rest} />;
  }
}

export default Input;
