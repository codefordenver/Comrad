import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import _ from 'lodash';

import ShowModalController from './ShowModalController';

import {
  MODAL_NEW_SHOW,
  MODAL_UPDATE_SHOW,
  MODAL_VIEW_SHOW,
} from './ShowModalController';

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
      showNewEventModal: false,
    };
  }

  componentDidMount() {
    const initialStartDate = moment().subtract(1, 'month');
    const initialEndDate = moment().add(1, 'month');

    this.props.searchShow(initialStartDate, initialEndDate);
  }

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

  showNewEventModal = show => {
    this.props.setModalVisibility(MODAL_NEW_SHOW, true);
    //Need to pass show to form reducer
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
          onSelectEvent={show => console.log(show)}
          onSelectSlot={show => this.showNewEventModal(show)}
          titleAccessor={show => show.show_details.title}
          startAccessor={show => new Date(show.show_start_time_utc)}
          endAccessor={show => new Date(show.show_end_time_utc)}
          onRangeChange={dateRange => this.handleDateChange(dateRange)}
        />

        <ShowModalController />
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
