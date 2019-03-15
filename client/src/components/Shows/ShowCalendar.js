import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModalVisibility } from '../../redux/modal';
import {
  getShowsData,
  fetchingShowsStatus,
  postingShowsStatus,
  searchShow,
  selectShow,
  errorShowsMessage,
} from '../../redux/show';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import _ from 'lodash';

import ShowModalController from './ShowModalController';
import Tooltip from '../Tooltip';
import ViewShowForm from './ViewShow/Form';

import { MODAL_NEW_SHOW, MODAL_VIEW_SHOW } from './ShowModalController';

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
    const { searchShow } = this.props;

    if (Array.isArray(dates)) {
      if (dates.length === 1) {
        //For when changing days
        const dayStart = moment(dates[0]).subtract(1, 'week');
        const dayEnd = moment(dates[0]).add(1, 'week');
        searchShow(dayStart, dayEnd);
      } else {
        //For when changing weeks
        const rangeStart = moment(dates[0]).subtract(1, 'months');
        const rangeEnd = moment(dates[dates.length - 1]).add(1, 'months');
        searchShow(rangeStart, rangeEnd);
      }
    } else {
      //For when changing months/agenda
      const objectStart = moment(dates.start).subtract(2, 'month');
      const objectEnd = moment(dates.end).add(2, 'month');
      searchShow(objectStart, objectEnd);
    }
  };

  convertShowsToArray = shows => {
    if (shows) {
      return _.values(shows);
    } else {
      return [];
    }
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
        setKey={_id}
        overlay={<ViewShowForm show={show} />}
        trigger="click"
        placement="right"
        destroyTooltipOnHide={true}
      >
        {props.children}
      </Tooltip>
    );
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    var style = {
      backgroundColor: '#007283',
    };
    return {
      style: style,
    };
  };

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const { shows } = this.props;

    return (
      <div>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.convertShowsToArray(shows)}
          defaultDate={new Date()}
          defaultView={BigCalendar.Views.WEEK}
          //onSelectEvent={show => this.showViewShowModal(show)}
          onSelectSlot={show => this.showNewShowModal(show)}
          titleAccessor={show => show.show_details.title}
          startAccessor={show => new Date(show.show_start_time_utc)}
          endAccessor={show => new Date(show.show_end_time_utc)}
          onRangeChange={dateRange => this.handleDateChange(dateRange)}
          onNavigate={view => console.log(view)}
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
