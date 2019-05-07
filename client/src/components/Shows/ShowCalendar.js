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
  createInstanceShow,
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
    console.log('reseeding events');
    const showsArray = shows ? _.values(shows) : [];
    let newShowsArray = [];
    showsArray.forEach(show => {
      let { show_start_time_utc, show_end_time_utc } = show;

      //Basic check for shows that start and end at midnight.
      if (moment(show_start_time_utc).format('HH') === '00') {
        show.show_start_time_utc = new Date(
          moment(show_start_time_utc).add(1, 'second'),
        );
      }

      if (moment(show_end_time_utc).format('HH') === '00') {
        show.show_end_time_utc = new Date(
          moment(show_end_time_utc).add(-1, 'second'),
        );
      }

      //Should be setup to check if shows span across midnight
      if (
        parseInt(moment(show_start_time_utc).format('HH')) >
        parseInt(moment(show_end_time_utc).format('HH'))
      ) {
        //Use this to push multiple shows if they span across midnight
        //newShowsArray.push(show2) //add show (1) and show (2)
        newShowsArray.push(show);
      } else {
        newShowsArray.push(show);
      }
    });

    return newShowsArray;
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
    //console.log('Tooltip fired');
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

  onSelectShow_CreateInstance = show => {
    const { createInstanceShow } = this.props;
    let { _id, master_show_uid, show_start_time_utc, show_end_time_utc } = show;

    if (master_show_uid) {
      _id = master_show_uid;
    }

    console.log(show);
    createInstanceShow(_id, { show_start_time_utc, show_end_time_utc });
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
          onSelectEvent={show => this.onSelectShow_CreateInstance(show)}
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
    createInstanceShow,
  },
)(Calendar);
