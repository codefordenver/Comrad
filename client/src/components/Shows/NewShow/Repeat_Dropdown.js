import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import moment from 'moment';

import Select from '../../Select';

import RRule from 'rrule';

class Repeat extends Component {
  handleInputChange = e => {
    const { name, value } = e.target;
    this.props.inputUpdate({ [name]: value });
  };

  render() {
    const definedRepeatRules = {
      daily: {
        name: 'Every Day',
        freq: RRule.DAILY,
      },
      weekdays: {
        name: 'Every Weekday (Mon-Fri)',
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
      },
      weekends: {
        name: 'Weekends (Sat/Sun)',
        freq: RRule.WEEKLY,
        byweekday: [RRule.SA, RRule.SU],
      },
      weekly: {
        name: 'Weekly on Monday',
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO],
      },
      byposition: {
        name: 'First Monday of the Month',
        freq: RRule.MONTHLY,
        byweekday: RRule.MO,
        bysetpos: [1],
      },
      byposition: {
        name: 'Last Monday of the Month',
        freq: RRule.MONTHLY,
        byweekday: RRule.MO,
        bysetpos: [-1],
      },
      byday: {
        name: 'On day 2',
        freq: RRule.MONTHLY,
        bymonthday: [2], //ADD DAY INPUT
      },
    };

    return (
      <div>
        <div className="">
          <Select
            selectOptions={['', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']}
            name="repeatType"
            onChange={this.handleInputChange}
          />
        </div>
      </div>
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
)(Repeat);
