import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/shows';
import _ from 'lodash';
import moment from 'moment';

import Alert from '../../components/Alert';

import EventNew from '../../components/Events/EventNew';
import EventSearch from '../../components/Events/EventSearch';
import EventCalendar from '../../components/Events/EventCalendar';

import {
  getShowsData,
  fetchingShowsStatus,
  postingShowsStatus,
  errorShowsMessage,
} from '../../reducers/shows';

class CalendarHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newShow: null,
      shows: {},
    };
  }

  render() {
    const { shows, showsFetching, showsPosting, showsError } = this.props;
    return (
      <div className="calendar__view">
        {showsError && (
          <Alert type="error">{showsError.response.data.message}</Alert>
        )}

        <EventCalendar />

        <EventNew />
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
)(CalendarHomePage);
