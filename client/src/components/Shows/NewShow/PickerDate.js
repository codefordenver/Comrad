import React, { Component } from 'react';
import classnames from 'classnames';
import { InputLabel } from '../../Input/Input';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }
  componentDidMount() {
    const { value } = this.props.input;

    if (value) {
      this.setState({ date: value });
    }
  }

  handleDateChangeRaw = date => {
    console.log('raw');
  };

  render() {
    const {
      input: { name, onChange },
      meta,
      label,
      className,
      ...rest
    } = this.props;

    return (
      <div className={classnames('form-group', className)}>
        <SingleDatePicker
          date={this.state.date}
          onDateChange={date => {
            onChange(date);
            this.setState({ date });
          }} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id={`${name}_picker`} // PropTypes.string.isRequired,
          isOutsideRange={() => false}
          numberOfMonths={1}
          small
          block
          onChangeRaw={() => console.log('Testing')}
          {...rest}
        />

        <InputLabel {...meta} dirtyOverride={true}>
          {label}
        </InputLabel>
      </div>
    );
  }
}

export default DatePicker;
