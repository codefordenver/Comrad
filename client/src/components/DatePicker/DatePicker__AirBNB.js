import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { InputLabel } from '../Input';

class DatePicker extends Component {
  state = {
    date: '',
    focused: false,
  };

  componentDidMount() {
    const { value } = this.props.input;

    if (value) {
      this.setState({ date: value });
    }
  }

  handleDateChange = date => {
    const { allowNullDate = false, input } = this.props;
    const { onChange } = input;

    if (moment(date).isValid() || allowNullDate) {
      onChange(date);
      this.setState({ date });
    }
  };

  handleFocusChange = ({ focused }) => {
    this.setState({ focused });
  };

  render() {
    const { handleDateChange, handleFocusChange, props, state } = this;
    const {
      className,
      input: { name, value },
      label,
      meta,
      ...rest
    } = props;
    const { focused } = state;

    return (
      <div className={classnames('form-group', className)}>
        <SingleDatePicker
          id={`${name}_picker`} // PropTypes.string.isRequired,
          date={value}
          onDateChange={handleDateChange} // PropTypes.func.isRequired
          focused={focused} // PropTypes.bool
          onFocusChange={handleFocusChange} // PropTypes.func.isRequired
          isOutsideRange={() => false}
          numberOfMonths={1}
          small
          block
          noBorder
          {...rest}
        />

        <InputLabel {...meta} dirtyOverride>
          {label}
        </InputLabel>
      </div>
    );
  }
}

export default DatePicker;
