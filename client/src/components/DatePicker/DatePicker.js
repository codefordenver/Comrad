import React, { Component } from 'react';
import classnames from 'classnames';
import { InputLabel } from '../Input/Input';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class DatePicker extends Component {
  state = { focused: false };

  componentDidMount() {
    const { value } = this.props.input;

    if (value) {
      this.setState({ date: value });
    }
  }

  render() {
    const {
      input: { name, onChange, value },
      meta,
      label,
      className,
      allowNullDate = false,
      ...rest
    } = this.props;
    const { focused } = this.state;

    return (
      <div className={classnames('form-group', className)}>
        <SingleDatePicker
          id={`${name}_picker`} // PropTypes.string.isRequired,
          date={value}
          onDateChange={date => {
            if (moment(date).isValid() || allowNullDate) {
              onChange(date);
              this.setState({ date });
            }
          }} // PropTypes.func.isRequired
          focused={focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
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
