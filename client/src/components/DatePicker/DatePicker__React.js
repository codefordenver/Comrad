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
      this.setState({date: value});
    }
  };

  dateAsDateObject = () => {
    const { type } = this.props;
    const { value } = this.props.input;
    const { date } = this.state;

    if (type === 'timeOnly' && moment(value, "h:mm a").isValid()) {
      return moment(value, "h:mm a").toDate();
    } else if (type === 'timeOnly' && moment(value, "h:mma").isValid()) {
      return moment(value, "h:mma").toDate();
    } else if (value instanceof Date) { // value is a date
      return date;
    } else if (!isNaN(Date.parse(value))) { //value can be converted to a date
      return new Date(value);
    } else if (!value && date != null) { //value is a falsy value, so change date to null if it is not already
      return null;
    }
  };

  handleDateChange = date => {
    const { allowNullDate = false, input, type } = this.props;
    const { onChange } = input;

    if (moment(date).isValid() || allowNullDate) {
      if (type === 'timeOnly') {
        onChange(moment(date).format('h:mm a'));
      } else {
        onChange(date);
      }
      this.setState({ date });
    }
  };

  render() {
    const { handleDateChange, props, state, dateAsDateObject } = this;
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
    let date = dateAsDateObject();

    return (
      <div className={classnames('form-group', className)}>
        {type === 'time' ? (
          <DatePicker
            id={`${name}_picker`}
            className={classnames('input', touched && error && 'error')}
            selected={(date instanceof Date) ? date : null}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="h:mm a"
            timeIntervals={15}
            timeCaption="Time"
            {...rest}
          />
        ) : type === 'timeOnly' ? (
            <DatePicker
              id={`${name}_picker`}
              className={classnames('input', touched && error && 'error')}
              selected={(date instanceof Date) ? date : null}
              onChange={handleDateChange}
              showTimeSelect
              showTimeSelectOnly
              timeFormat="h:mm a"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              {...rest}
            />
          ) : (
            <DatePicker
              id={`${name}_picker`}
              className={classnames('input', touched && error && 'error')}
              selected={(date instanceof Date) ? date : null}
              onChange={handleDateChange}
              {...rest}
            />
          )
        }

        <InputLabel {...meta} dirtyOverride>
          {label}
        </InputLabel>
        {touched && error && <InputError>{error}</InputError>}
      </div>
    );
  }
}

export default DatePicker__React;
