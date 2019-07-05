import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Checkbox extends Component {
  static propTypes = {
    /**
     * Add checked attribute to element
     */
    checked: PropTypes.bool,
    /**
     * Additional classes added to component
     */
    className: PropTypes.string,
    /**
     * Add disabled attribute and class to element
     */
    disabled: PropTypes.bool,
    /**
     * Add hover class to element
     */
    hover: PropTypes.bool,
    /**
     * Needed to link checkbox with label
     */
    id: PropTypes.string.isRequired,
    /**
     * Text used to label checkbox
     */
    label: PropTypes.string,
  };

  static defaultProps = {
    checked: false,
    className: null,
    disabled: false,
    hover: false,
    label: null,
  };

  render() {
    const {
      checked,
      className,
      disabled,
      hover,
      id,
      label,
      input,
    } = this.props;
    return (
      <div className={classnames('checkbox', className)}>
        <input
          {...input}
          checked={checked}
          className="checkbox__input"
          id={id}
          type="checkbox"
          disabled={disabled}
        />
        <label
          onClick={this.props.onClick}
          className={classnames(
            'checkbox__label',
            disabled && 'disabled',
            hover && 'hover',
          )}
          for={id}
        >
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
