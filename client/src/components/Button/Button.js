import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const BUTTON_CLASS = {
  primary: 'button--primary',
  success: 'button--success',
  info: 'button--info',
  neutral: 'button--neutral',
  danger: 'button--danger',
  warning: 'button--warning',
  link: 'button--link',
};

export const BUTTON_TYPE = {
  button: 'button',
  submit: 'submit',
};

export const BUTTON_SIZE = {
  small: 'button--small',
  normal: 'button--normal',
};

class Button extends Component {
  render() {
    const { props } = this;
    const {
      children,
      className,
      color,
      disabled,
      loading,
      onClick,
      size,
      submitting,
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
        className={classnames(
          'button',
          BUTTON_CLASS[color],
          BUTTON_SIZE[size],
          className,
        )}
        disabled={submitting}
        onClick={onClick}
        size={size}
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
    'neutral',
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
   * Updates size of button
   */
  size: PropTypes.string,
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
  size: 'normal',
  type: 'button',
};

export default Button;
