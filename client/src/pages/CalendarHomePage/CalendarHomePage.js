import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';
import DropdownHost, {
  SHOWS_WITH_NO_HOST,
} from '../../components/DropdownHost';

import ShowCalendar from '../../components/Shows/ShowCalendar';
import { setModalVisibility } from '../../redux/modal';
import { MODAL_NEW_SHOW } from '../../components/Shows/ShowModalController';

import {
  clearShows,
  getShowsData,
  fetchingShowsStatus,
  postingShowsStatus,
  errorShowsMessage,
  selectShow,
} from '../../redux/show';

class CalendarHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterByHost: null,
      onlyDisplayShowsWithNoHost: false,
      newShow: null,
      selectedDate: moment(),
      shows: {},
    };
  }

  showNewShowModal = show => {
    const { setModalVisibility, selectShow } = this.props;

    selectShow(show);
    setModalVisibility(MODAL_NEW_SHOW, true, show);
  };

  dateChangeHandler = date => {
    if (date instanceof Date) {
      this.setState({ selectedDate: moment(date) });
    } else {
      this.setState({ selectedDate: date });
    }
  };

  handleHostSelect = host => {
    const { clearShows } = this.props;
    clearShows();
    if (host._id === SHOWS_WITH_NO_HOST) {
      this.setState({
        filterByHost: null,
        onlyDisplayShowsWithNoHost: true,
      });
    } else {
      this.setState({
        filterByHost: host != null ? host._id : null,
        onlyDisplayShowsWithNoHost: false,
      });
    }
  };

  render() {
    const { showsError } = this.props;
    const {
      filterByHost,
      onlyDisplayShowsWithNoHost,
      selectedDate,
    } = this.state;
    console.log(this.props);

    // we will set a key for the month/year that is currently selected
    // so that the displayed month in DayPickerSingleDateController will auto-update
    // as the selected date property changes
    // (workaround for this issue: https://github.com/airbnb/react-dates/issues/48)
    // unfortunately, this also causes the calendar to flash briefly while selecting a date in a different month
    const dayPickerKey =
      String(selectedDate.month()) + String(selectedDate.year());

    return (
      <Card>
        <CardBody>
          <div className="calendar-add-button" onClick={this.showNewShowModal}>
            Add
          </div>
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
                onFocusChange={({ focused }) =>
                  this.setState({ focused: true })
                } // Force the focused states to always be truthy so that date is always selectable
                hideKeyboardShortcutsPanel={true}
              />
              <DropdownHost
                onHostSelect={this.handleHostSelect}
                showsWithNoHostOption="Shows with No Host"
                displayAddNewHostOption={false}
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
                filterByHost={filterByHost}
                onlyDisplayShowsWithNoHost={onlyDisplayShowsWithNoHost}
                onDateChange={this.dateChangeHandler}
              />
            </div>
          </div>
        </CardBody>
      </Card>
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
    clearShows,
    getShowsData,
    fetchingShowsStatus,
    postingShowsStatus,
    errorShowsMessage,
    selectShow,
    setModalVisibility,
  },
)(CalendarHomePage);
