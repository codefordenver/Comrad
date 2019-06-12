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

    const initialSearchStartDate = moment().subtract(2, 'week');
    const initialSearchEndDate = moment().add(2, 'week');

    searchShow(initialSearchStartDate, initialSearchEndDate);
  }

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`),
    );
    Object.entries(this.state).forEach(
      ([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`),
    );
  }

  handleDateChange = dates => {
    const { searchShow } = this.props;

    if (Array.isArray(dates)) {
      if (dates.length === 1) {
        //For when changing days
        const dayStart = moment(dates[0]).subtract(2, 'days');
        const dayEnd = moment(dates[0]).add(2, 'days');

        searchShow(dayStart, dayEnd);
      } else {
        //For when changing weeks
        const rangeStart = moment(dates[0]).subtract(8, 'days');
        const rangeEnd = moment(dates[dates.length - 1]).add(8, 'days');

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
    //console.log('Updating Calendar Events');
    const showsArray = shows ? _.values(shows) : [];
    let newShowsArray = [];
    showsArray.forEach(show => {
      let { start_time_utc, end_time_utc } = show;
      //Should be setup to check if shows span across midnight
      //IMPORTANT:  Only offset the start/end times in the accessor
      if (
        parseInt(moment(start_time_utc).format('HH')) >
        parseInt(moment(end_time_utc).format('HH'))
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
      event: { master_time_id },
    } = props;
    const show = props.event;

    return (
      <Tooltip
        key={master_time_id}
        id={master_time_id}
        overlay={<ViewShowForm show={show} />}
        trigger="click"
        placement="right"
        destroyTooltipOnHide={true}
      >
        {props.children}
      </Tooltip>
    );
  };

  startAccessorCalc(show) {
    const { start_time_utc } = show;
    //Basic check for shows that start and end at midnight.
    if (
      moment(start_time_utc).format('HH') === '00' &&
      moment(start_time_utc).format('mm') === '00'
    ) {
      return new Date(moment(start_time_utc).add(1, 'second'));
    }
    return new Date(moment(start_time_utc));
  }

  endAccessorCalc(show) {
    const { end_time_utc } = show;
    if (
      moment(end_time_utc).format('HH') === '00' &&
      moment(end_time_utc).format('mm') === '00'
    ) {
      return new Date(moment(end_time_utc).add(-1, 'minute'));
    }
    return new Date(moment(end_time_utc));
  }

  onSelectShow = show => {
    //do nothing
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
          //onSelectEvent={show => this.onSelectShow(show)}
          onSelectSlot={show => this.showNewShowModal(show)}
          titleAccessor={show => show.show_details.title}
          startAccessor={show => this.startAccessorCalc(show)}
          endAccessor={show => this.endAccessorCalc(show)}
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
