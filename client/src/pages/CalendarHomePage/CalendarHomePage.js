import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/shows';

import Alert from '../../components/Alert';

import ShowCalendar from '../../components/Shows/ShowCalendar';

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
          <Alert
            type="danger"
            header="Error Loading Shows"
            text={showsError.response.data.message}
          />
        )}

        <ShowCalendar />
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
