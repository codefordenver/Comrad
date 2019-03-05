import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '../../components/Alert';

import ShowCalendar from '../../components/Shows/ShowCalendar';

import {
  getShowsData,
  fetchingShowsStatus,
  postingShowsStatus,
  errorShowsMessage,
} from '../../redux/show';

class CalendarHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newShow: null,
      shows: {},
    };
  }

  render() {
    const { showsError } = this.props;

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
  {
    getShowsData,
    fetchingShowsStatus,
    postingShowsStatus,
    errorShowsMessage,
  },
)(CalendarHomePage);
