import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  DayPickerSingleDateController,
  VERTICAL_ORIENTATION,
} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import Alert from '../../components/Alert';

import ShowCalendar from '../../components/Shows/ShowCalendar';

import {
  getShowsData,
  fetchingShowsStatus,
  postingShowsStatus,
  errorShowsMessage,
} from '../../redux/show';

class CalendarHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newShow: null,
      shows: {},
    };
  }

  render() {
    const { showsError } = this.props;

    return (
      <div className="calendar">
        <div className="calendar__sidebar">
          <DayPickerSingleDateController
            date={moment()}
            horizontalMonthPadding="0"
            noBorder={true}
            daySize="26"
            numberOfMonths="1"
            onDateChange={date => console.log(date)}
            focused={true}
            onFocusChange={({ focused }) => this.setState({ focused: true })} // Force the focused states to always be truthy so that date is always selectable
            id="sidebar_calendar"
          />
        </div>
        <div className="calendar__view">
          {showsError && (
            <Alert
              type="danger"
              header="Error Loading Shows"
              text={showsError.response.data.message}
            />
          )}
          <ShowCalendar />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ shows }) {
  return {
    shows: getShowsData(shows),
    showsFetching: fetchingShowsStatus(shows),
    showsPosting: postingShowsStatus(shows),
    showsError: errorShowsMessage(shows),
  };
}

export default connect(
  mapStateToProps,
  {
    getShowsData,
    fetchingShowsStatus,
    postingShowsStatus,
    errorShowsMessage,
  },
)(CalendarHomePage);
