import React, { Component } from 'react';

import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }
  componentDidMount() {
    //const { dateType } = this.props;
  }

  render() {
    const {
      input: { name, value, onChange },
    } = this.props;

    console.log('DatePicker Props');
    console.log(this.props);

    return (
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
      />
    );
  }
}

export default DatePicker;
