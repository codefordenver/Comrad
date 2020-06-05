import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { setModalVisibility } from '../../redux/modal';
import {
  clearShows,
  getShowsData,
  fetchingShowsStatus,
  postingShowsStatus,
  searchShow,
  selectShow,
  errorShowsMessage,
  createInstanceShow,
} from '../../redux/show';

import ShowModalController from './ShowModalController';
import { MODAL_NEW_SHOW } from './ShowModalController';
import Tooltip from '../Tooltip';
import ViewShowForm from './ViewShow/Form';
import { getShowType } from '../../utils/shows';

class Calendar extends Component {
  state = {
    newShow: null,
    searchStartDate: moment().subtract(2, 'week'),
    searchEndDate: moment().add(2, 'week'),
    shows: [],
  };

  componentDidMount() {
    this.searchShows();
  }

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) => {
      if (prevProps[key] !== val) {
        console.log(`Prop '${key}' changed`);
        if (key === 'filterByHost' || key === 'onlyDisplayShowsWithNoHost') {
          this.searchShows();
        } else if (key === 'date') {
          this.setState(
            {
              searchStartDate: moment(val).subtract(8, 'days'),
              searchEndDate: moment(val).add(8, 'days'),
            },
            function() {
              this.searchShows();
            },
          );
        }
      }
    });
    Object.entries(this.state).forEach(
      ([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`),
    );
  }

  componentWillUnmount() {
    const { clearShows } = this.props;
    clearShows();
  }

  handleDateChange = dates => {
    if (Array.isArray(dates)) {
      if (dates.length === 1) {
        //For when changing days
        this.setState(
          {
            searchStartDate: moment(dates[0]).subtract(2, 'days'),
            searchEndDate: moment(dates[0]).add(2, 'days'),
          },
          function() {
            this.searchShows();
          },
        );
      } else {
        //For when changing weeks
        this.setState(
          {
            searchStartDate: moment(dates[0]).subtract(8, 'days'),
            searchEndDate: moment(dates[dates.length - 1]).add(8, 'days'),
          },
          function() {
            this.searchShows();
          },
        );
      }
    } else {
      //For when changing months/agenda
      this.setState(
        {
          searchStartDate: moment(dates.start).subtract(1, 'month'),
          searchEndDate: moment(dates.end).add(1, 'month'),
        },
        function() {
          this.searchShows();
        },
      );
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

  searchShows = () => {
    const { searchStartDate, searchEndDate } = this.state;
    const {
      filterByHost,
      onlyDisplayShowsWithNoHost = false,
      searchShow,
    } = this.props;
    searchShow(
      searchStartDate,
      searchEndDate,
      filterByHost,
      onlyDisplayShowsWithNoHost,
    );
  };

  showNewShowModal = show => {
    const { auth, setModalVisibility, selectShow } = this.props;

    if (
      auth.doc.roles != null &&
      (auth.doc.roles.indexOf('Admin') !== -1 ||
        auth.doc.roles.indexOf('Full Access') !== -1 ||
        auth.doc.roles.indexOf('Show Captain') !== -1)
    ) {
      selectShow(show);
      setModalVisibility(MODAL_NEW_SHOW, true, null);
    }
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

  onSelectShow = show => {
    //do nothing
  };

  eventStyleGetter = show => {
    let className = '';
    let showType = getShowType(show);

    if (process.env.REACT_APP_SHOW_SHOW_TYPES_IN_DIFFERENT_STYLES === 'true') {
      if (showType === 'series') {
        className = 'event-series--dev-environment-only-style';
      } else if (showType === 'instance') {
        className = 'event-instance--dev-environment-only-style';
      } else {
        className = 'event-regular--dev-environment-only-style';
      }
    }

    return {
      className,
    };
  };

  render() {
    const { date, shows } = this.props;
    const localizer = momentLocalizer(moment);

    //if date provided in properties, always have the calendar display that date
    let calendarDateProperty = typeof date == 'undefined' ? {} : { date: date };

    return (
      <div>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.convertShowsToArray(shows)}
          defaultView={Views.WEEK}
          views={['week', 'day']}
          defaultDate={new Date()}
          {...calendarDateProperty}
          //onSelectEvent={show => this.onSelectShow(show)}
          onSelectSlot={show => this.showNewShowModal(show)}
          titleAccessor={show => show.show_details.title}
          startAccessor={show => new Date(show.start_time_utc)}
          endAccessor={show => new Date(show.end_time_utc)}
          onRangeChange={dateRange => this.handleDateChange(dateRange)}
          onNavigate={date => this.handleNavigate(date)}
          eventPropGetter={this.eventStyleGetter}
          showMultiDayTimes
          components={{
            eventWrapper: this.customEventWrapper,
          }}
        />

        <ShowModalController />
      </div>
    );
  }
}

function mapStateToProps({ auth, show }) {
  return {
    auth,
    shows: getShowsData(show),
    showsFetching: fetchingShowsStatus(show),
    showsPosting: postingShowsStatus(show),
    showsError: errorShowsMessage(show),
  };
}

export default connect(
  mapStateToProps,
  {
    clearShows,
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
