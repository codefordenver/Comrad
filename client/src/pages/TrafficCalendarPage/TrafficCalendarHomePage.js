import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Card, { CardBody } from '../../components/Card';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import Alert from '../../components/Alert';

import { trafficActions } from '../../redux';

import TrafficCalendar from '../../components/Traffic/TrafficCalendar';

class TrafficCalendarHomePage extends Component {
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

  handleTrafficAddButtonClick = () => {
    const { history, trafficActions } = this.props;
    trafficActions.setReturnPageAfterAddDeleteActions('/traffic-calendar');
    history.push('/traffic/add');
  };

  render() {
    const { history, showsError } = this.props;
    const { selectedDate } = this.state;

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
          <div className="calendar">
            <div className="calendar__sidebar">
              <div className="add-button-wrapper">
                <div
                  className="calendar-add-button"
                  onClick={this.handleTrafficAddButtonClick}
                >
                  <div className="calendar-add-button-text">Add</div>
                  <i className="fas fa-plus" />
                </div>
              </div>
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
            </div>
            <div className="calendar__view">
              {showsError && (
                <Alert
                  type="danger"
                  header="Error Loading Shows"
                  text={showsError.response.data.message}
                />
              )}
              <TrafficCalendar
                date={selectedDate.toDate()}
                onDateChange={this.dateChangeHandler}
                history={history}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrafficCalendarHomePage);
