import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
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
      selectedDate: moment(),
      shows: {},
    };
  }

  dateChangeHandler = date => {
    if (date instanceof Date) {
      this.setState({ selectedDate: moment(date) });
    } else {
      this.setState({ selectedDate: date });
    }
  };

  render() {
    const { showsError } = this.props;
    const { selectedDate } = this.state;

    // we will set a key for the month/year that is currently selected
    // so that the displayed month in DayPickerSingleDateController will auto-update
    // as the selected date property changes
    // (workaround for this issue: https://github.com/airbnb/react-dates/issues/48)
    // unfortunately, this also causes the calendar to flash briefly while selecting a date in a different month
    const dayPickerKey =
      String(selectedDate.month()) + String(selectedDate.year());

    return (
      <div className="calendar">
        <div className="calendar__sidebar">
          <DayPickerSingleDateController
            key={dayPickerKey}
            date={selectedDate}
            horizontalMonthPadding={0}
            noBorder={true}
            daySize={28}
            numberOfMonths={1}
            onDateChange={this.dateChangeHandler}
            focused={true}
            onFocusChange={({ focused }) => this.setState({ focused: true })} // Force the focused states to always be truthy so that date is always selectable
            hideKeyboardShortcutsPanel={true}
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
          <ShowCalendar
            date={selectedDate.toDate()}
            onDateChange={this.dateChangeHandler}
          />
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
