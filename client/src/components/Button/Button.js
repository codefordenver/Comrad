import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const BUTTON_CLASS = {
  primary: 'button--primary',
  success: 'button--success',
  info: 'button--info',
  danger: 'button--danger',
  warning: 'button--warning',
  link: 'button--link',
};

export const BUTTON_TYPE = {
  button: 'button',
  submit: 'submit',
};

class Button extends Component {
  render() {
    const { props } = this;
    const {
      children,
      color,
      disabled,
      loading,
      onClick,
      className,
      to,
      type,
      ...rest
    } = props;

    if (to) {
      return (
        <Link
          className={classnames('button', 'button--link', className)}
          disabled={disabled}
          onClick={onClick}
          to={to}
          type={type}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classnames('button', BUTTON_CLASS[color], className)}
        disabled={loading}
        onClick={onClick}
        type={BUTTON_TYPE[type]}
        {...rest}
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
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  color: 'primary',
  type: 'button',
};

export default Button;
