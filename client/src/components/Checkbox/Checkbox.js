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
     * Needed to link checkbox with label. If the component is used in Redux Form, this is overridden with the value provided by input.id.
     */
    id: PropTypes.string,
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

  handleOnChange = e => {
    if (this.props.input != null) {
      this.props.input.onChange(e.target.checked);
    }
    this.setState({ checked: e.target.checked });
  };

  render() {
    let { id } = this.props;
    const { className, disabled, hover, label, input } = this.props;
    const { checked } = this.state;

    if (input != null) {
      id = input.name;
    }

    return (
      <div className={classnames('checkbox', className)}>
        <input
          {...input}
          checked={checked}
          className="checkbox__input"
          id={id}
          onChange={this.handleOnChange}
          type="checkbox"
          disabled={disabled}
        />
        <label
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
