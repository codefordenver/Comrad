import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
      input: { name, value },
      label,
      meta,
      controlledDate,
      ...rest
    } = props;
    let { date } = state;

    if (controlledDate && moment(controlledDate).isValid()) {
      date = new Date(controlledDate);
    }

    return (
      <div className={classnames('form-group', className)}>
        <DatePicker
          id={`${name}_picker`}
          className="input"
          selected={date}
          onChange={handleDateChange}
          timeInputLabel={`${label}:`}
          {...rest}
        />

        <InputLabel {...meta} dirtyOverride>
          {label}
        </InputLabel>
      </div>
    );
  }
}

export default DatePicker__React;
