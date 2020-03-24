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
      input: { name },
      label,
      meta,
      controlledDate,
      type,
      ...rest
    } = props;
    let { date } = state;

    if (controlledDate && moment(controlledDate).isValid()) {
      date = new Date(controlledDate);
    }

    console.log(rest);

    return (
      <div className={classnames('form-group', className)}>
        {type === 'time' ? (
          <DatePicker
            id={`${name}_picker`}
            className="input"
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
            className="input"
            selected={date}
            onChange={handleDateChange}
            {...rest}
          />
        )}

        <InputLabel {...meta} dirtyOverride>
          {label}
        </InputLabel>
      </div>
    );
  }
}

export default DatePicker__React;
