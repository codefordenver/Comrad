import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { setModalVisibility } from '../../redux/modal';
import {
  getShowsData,
  fetchingShowsStatus,
  postingShowsStatus,
  searchShow,
  selectShow,
  errorShowsMessage,
} from '../../redux/show';

import ShowModalController from './ShowModalController';
import { MODAL_NEW_SHOW, MODAL_VIEW_SHOW } from './ShowModalController';
import Tooltip from '../Tooltip';
import ViewShowForm from './ViewShow/Form';

class Calendar extends Component {
  state = {
    newShow: null,
    shows: [],
  };

  componentDidMount() {
    const { searchShow } = this.props;

    const initialSearchStartDate = moment().subtract(1, 'month');
    const initialSearchEndDate = moment().add(1, 'month');

    searchShow(initialSearchStartDate, initialSearchEndDate);
  }

  handleDateChange = dates => {
    const { searchShow } = this.props;

    if (Array.isArray(dates)) {
      if (dates.length === 1) {
        //For when changing days
        const dayStart = moment(dates[0]).subtract(1, 'week');
        const dayEnd = moment(dates[0]).add(1, 'week');

        searchShow(dayStart, dayEnd);
      } else {
        //For when changing weeks
        const rangeStart = moment(dates[0]).subtract(2, 'weeks');
        const rangeEnd = moment(dates[dates.length - 1]).add(2, 'weeks');

        searchShow(rangeStart, rangeEnd);
      }
    } else {
      //For when changing months/agenda
      const objectStart = moment(dates.start).subtract(1, 'month');
      const objectEnd = moment(dates.end).add(1, 'month');

      searchShow(objectStart, objectEnd);
    }
  };

  handleNavigate = date => {
    if (typeof this.props.onDateChange == 'function') {
      this.props.onDateChange(date);
    }
  };

  convertShowsToArray = shows => {
    return shows ? _.values(shows) : [];
  };

  showNewShowModal = show => {
    const { setModalVisibility, selectShow } = this.props;

    selectShow(show);
    setModalVisibility(MODAL_NEW_SHOW, true, show);
  };

  showViewShowModal = show => {
    const { setModalVisibility } = this.props;

    setModalVisibility(MODAL_VIEW_SHOW, true, show);
  };

  customEventWrapper = props => {
    const {
      event: { _id, master_show_uid },
    } = props;
    const show = { _id, master_show_uid };

    return (
      <Tooltip
        key={_id}
        id={_id}
        overlay={<ViewShowForm show={show} />}
        trigger="click"
        placement="right"
        destroyTooltipOnHide={true}
      >
        {props.children}
      </Tooltip>
    );
  };

  eventStyleGetter = () => {
    var style = {
      backgroundColor: '#007283',
    };

    return {
      style,
    };
  };

  render() {
    const { date, shows } = this.props;
    const localizer = BigCalendar.momentLocalizer(moment);

    //if date provided in properties, always have the calendar display that date
    let calendarDateProperty = typeof date == 'undefined' ? {} : { date: date };

    return (
      <div>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.convertShowsToArray(shows)}
          defaultView={BigCalendar.Views.WEEK}
          defaultDate={new Date()}
          {...calendarDateProperty}
          //onSelectEvent={show => this.showViewShowModal(show)}
          onSelectSlot={show => this.showNewShowModal(show)}
          titleAccessor={show => show.show_details.title}
          startAccessor={show => new Date(show.show_start_time_utc)}
          endAccessor={show => new Date(show.show_end_time_utc)}
          onRangeChange={dateRange => this.handleDateChange(dateRange)}
          onNavigate={date => this.handleNavigate(date)}
          eventPropGetter={this.eventStyleGetter}
          components={{
            eventWrapper: this.customEventWrapper,
          }}
        />

        <ShowModalController />
      </div>
    );
  }
}

function mapStateToProps({ show }) {
  return {
    shows: getShowsData(show),
    showsFetching: fetchingShowsStatus(show),
    showsPosting: postingShowsStatus(show),
    showsError: errorShowsMessage(show),
  };
}

export default connect(
  mapStateToProps,
  {
    getShowsData,
    fetchingShowsStatus,
    postingShowsStatus,
    searchShow,
    setModalVisibility,
    errorShowsMessage,
    selectShow,
  },
)(Calendar);
