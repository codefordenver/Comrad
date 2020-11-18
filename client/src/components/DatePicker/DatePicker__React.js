import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { InputError } from '../Input';
import { InputLabel } from '../Input';

class DatePicker__React extends Component {
  state = {
    date: null,
  };

  componentDidMount() {
    const { value } = this.props.input;

    if (value) {
      this.setState({ date: new Date(value) });
    }
  }

  componentDidUpdate() {
    const { value } = this.props.input;
    const { date } = this.state;

    if (value instanceof Date && value !== date) {
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

  render() {
    const { handleDateChange, props, state } = this;
    const {
      className,
      input: { name },
      label,
      meta = {
        active: false,
        dirty: false,
        error: false,
        touched: false,
        submitting: false,
      } /* default values for when component is not used within React Form */,
      type,
      ...rest
    } = props;
    let { touched, error } = meta;
    let { date } = state;

    return (
      <div className={classnames('form-group', className)}>
        {type === 'time' ? (
          <DatePicker
            id={`${name}_picker`}
            className={classnames('input', touched && error && 'error')}
            selected={date}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="h:mmaa"
            timeIntervals={15}
            timeCaption="Time"
            {...rest}
          />
        ) : (
          <DatePicker
            id={`${name}_picker`}
            className={classnames('input', touched && error && 'error')}
            selected={date}
            onChange={handleDateChange}
            {...rest}
          />
        )}

        <InputLabel {...meta} dirtyOverride>
          {label}
        </InputLabel>
        {touched && error && <InputError>{error}</InputError>}
      </div>
    );
  }
}

export default DatePicker__React;
