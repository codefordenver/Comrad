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
  MODAL_EDIT_SHOW,
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
    };
  }

  componentDidMount() {
    const initialSearchStartDate = moment().subtract(1, 'month');
    const initialSearchEndDate = moment().add(1, 'month');

    this.props.searchShow(initialSearchStartDate, initialSearchEndDate);
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

  showNewShowModal = show => {
    const {
      inputUpdateShowTime,
      inputUpdateShowDate,
      setModalVisibility,
    } = this.props;

    let { start, end } = show;
    inputUpdateShowTime('show_start_time_utc', start);
    inputUpdateShowTime('show_end_time_utc', end);

    inputUpdateShowDate('repeat_start_date', start);
    inputUpdateShowDate('repeat_end_date', end);

    setModalVisibility(MODAL_NEW_SHOW, true, show);
  };

  showViewShowModal = show => {
    const { setModalVisibility } = this.props;

    setModalVisibility(MODAL_VIEW_SHOW, true, show);
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
          onSelectEvent={show => this.showViewShowModal(show)}
          onSelectSlot={show => this.showNewShowModal(show)}
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
