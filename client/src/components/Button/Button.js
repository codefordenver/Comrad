import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { children, color, ...rest } = this.props;

    return (
      <button className={`button ${color && `button--${color}`}`} {...rest}>
        {children}
      </button>
    );
  }
}

export default Button;
