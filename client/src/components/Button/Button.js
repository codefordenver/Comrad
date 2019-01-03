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
  /**
   * Change the color
   */
  color: PropTypes.string,
  /**
   * Add an on click function to the component
   */
  onClick: PropTypes.func,
  /**
   * Set the type for the button
   */
  type: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  color: 'primary',
  onClick: null,
  type: 'button',
};

export default Button;
