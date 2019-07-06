import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Checkbox extends Component {
  static propTypes = {
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
     * whether or not the checkbox is checked initially, defaults to false. If the component is used in Redux Form, this is overridden with a value provided in the input.value property by Redux Form.
     */
    initialChecked: PropTypes.bool,
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

  constructor(props) {
    let { initialChecked = false, input } = props;
    if (input != null) {
      initialChecked = input.value;
    }
    super(props);
    this.state = {
      checked: initialChecked,
    };
  }

  handleOnClick = () => {
    let newValue = !this.state.checked;
    this.props.input.onChange(newValue);
    this.setState({ checked: newValue });
  };

  render() {
    const { className, disabled, hover, id, label, input } = this.props;
    const { checked } = this.state;
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
          onClick={this.handleOnClick}
          className={classnames(
            'checkbox__label',
            disabled && 'disabled',
            hover && 'hover',
          )}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
