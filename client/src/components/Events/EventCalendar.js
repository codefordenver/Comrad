import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import _ from 'lodash';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  getShowsData,
  fetchingShowsStatus,
  postingShowsStatus,
  errorShowsMessage,
} from '../../reducers/shows';

class Calendar extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      newShow: null,
      shows: [],
    };
  }

  componentDidMount() {
    const initialStartDate = moment().subtract(1, 'month');
    const initialEndDate = moment().add(1, 'month');

    this.props.searchShow(initialStartDate, initialEndDate);
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event Name');
    if (title) {
      this.setState({
        shows: [...this.state.shows, { start, end, title }],
      });
    }
  };

  handleDateChange = dates => {
    alert('Should probably implement date updates...');
  };

  convertShowsToArray = shows => {
    if (shows) {
      return _.values(shows);
    } else {
      return [];
    }
  };

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const { shows, showsFetching, showsPosting, showsError } = this.props;

    return (
      <div>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.convertShowsToArray(shows)}
          defaultView={BigCalendar.Views.WEEK}
          onSelectEvent={show => alert(show.title)}
          onSelectSlot={this.handleSelect}
          titleAccessor={show => show.show_details.title}
          startAccessor={show => new Date(show.show_start_time_utc)}
          endAccessor={show => new Date(show.show_end_time_utc)}
          onRangeChange={dates => this.handleDateChange(dates)}
        />
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
  actions,
)(Calendar);
