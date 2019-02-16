import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import moment from 'moment';

import Input from '../../Input';
import { REGEX_ANY_CHARS } from '../../../utils/validation';

class PickerTime extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  render() {
    //Props
    const { timeType } = this.props;

    //Actions
    const { inputUpdateShowTime } = this.props;

    //Reducers
    const time = this.props.input[timeType];

    return (
      <Input
        name={timeType}
        action={inputUpdateShowTime}
        type="time"
        initialValue={moment(time).format('HH:mm')}
        validate={REGEX_ANY_CHARS}
        feedback="Enter Field"
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
)(PickerTime);
