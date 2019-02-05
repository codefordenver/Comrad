import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

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
    //Props
    const { dateType, initialDate } = this.props;

    //Actions
    const { inputUpdateShowDate } = this.props;

    return (
      <SingleDatePicker
        date={moment(initialDate)} // momentPropTypes.momentObj or null
        onDateChange={date => inputUpdateShowDate(dateType, date)} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id={`${dateType}_picker`} // PropTypes.string.isRequired,
        isOutsideRange={() => false}
        numberOfMonths={1}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    input: state.input,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(DatePicker);
