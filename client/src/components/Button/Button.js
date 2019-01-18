import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Button extends Component {
  getButtonClass(color) {
    switch (color) {
      case 'primary':
        return 'button--primary';
      case 'success':
        return 'button--success';
      case 'info':
        return 'button--info';
      case 'danger':
        return 'button--danger';
      case 'warning':
        return 'button--warning';
      case 'link':
        return 'button--link';
      default:
        break;
    }
  }

  render() {
    const { getButtonClass, props } = this;
    const { children, color, disabled, onClick, className, to, type } = props;

    if (to) {
      return (
        <Link
          className={`button button--link ${className}`}
          disabled={disabled}
          onClick={onClick}
          to={to}
          type={type}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={`button ${getButtonClass(color)} ${className}`}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  /**
   * Any thing from elements to strings
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /**
   * Change the color
   */
  color: PropTypes.oneOf([
    'primary',
    'success',
    'info',
    'danger',
    'warning',
    'link',
  ]),
  /**
   * If you want to disable the button
   */
  disabled: PropTypes.bool,
  /**
   * Add an on click function to the component
   */
  onClick: PropTypes.func,
  /**
   * Any additional classes added
   */
  className: PropTypes.string,
  /**
   * Make this button a Link instead
   */
  to: PropTypes.string,
  /**
   * Button type
   */
  type: PropTypes.string,
};

Button.defaultProps = {
  color: 'primary',
  className: '',
  type: 'button',
};

export default Button;
