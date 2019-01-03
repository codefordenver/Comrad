import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      children,
      color,
      disabled,
      onClick,
      styleName,
      to,
      type,
    } = this.props;
    if (to) {
      return (
        <Link
          disabled={disabled}
          to={to}
          className={`button button--link ${styleName}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={`button button--${color} ${styleName}`}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /**
   * Change the color
   */
  color: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * Add an on click function to the component
   */
  onClick: PropTypes.func,
  /**
   * Set the type for the button
   */
  styleName: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  color: 'primary',
  disabled: false,
  onClick: null,
  styleName: '',
  to: '',
  type: 'button',
};

export default Button;
