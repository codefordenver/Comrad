import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { children, color, onClick, type } = this.props;

    return (
      <button
        className={`button button--${color}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  color: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  color: 'primary',
  type: 'button',
};

export default Button;
