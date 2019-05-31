import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  errorShowsMessage,
  fetchingShowsStatus,
  getShowsData,
  searchShow,
} from '../../redux/show';
import { formatHostName } from '../../utils/formatters';

class ShowBuilderShowListPage extends Component {
  state = {
    //TODO: add dates
  };

  componentDidMount = () => {
    const { searchShow } = this.props;

    const initialSearchStartDate = moment();
    const initialSearchEndDate = moment().add(1, 'day');

    searchShow(initialSearchStartDate, initialSearchEndDate);
  };

  render() {
    const { formatHostName, showsFetching, shows } = this.props;

    let showElements = [];
    if (shows != null) {
      let displayDate = '';
      Object.keys(shows).forEach(function(s) {
        let showObject = shows[s];
        let startTime = moment(showObject.show_start_time_utc);
        let endTime = moment(showObject.show_end_time_utc);
        let startTimeFormatted = startTime.format('LT');
        let endTimeFormatted = endTime.format('LT');
        let showUrl =
          '/show-builder/show?startTime=' +
          startTime.utc().format() +
          '&endTime=' +
          endTime.utc().format();
        let hostElement = [];
        let showDate = startTime.format('LL');
        showDate = showDate.substring(0, showDate.lastIndexOf(',')); // format as "March 3"
        if (displayDate != showDate) {
          showElements.push(<h2 key={showDate}>{showDate}</h2>);
          displayDate = showDate;
        }
        if (showObject.show_details.host != null) {
          let formattedHostName = formatHostName(showObject.show_details.host);
          hostElement.push(
            <span key={showObject.show_details.host._id}>
              hosted by {formattedHostName}
            </span>,
          );
        }
        showElements.push(
          <div key={s}>
            <Link to={showUrl}>{showObject.show_details.title}</Link>
            {hostElement}
            <span>
              {startTimeFormatted} - {endTimeFormatted}
            </span>
          </div>,
        );
      });
    }

    return (
      <div>
        <h1>Show List</h1>
        <div>TODO: date selectors</div>
        {!showsFetching && <div>{showElements}</div>}
      </div>
    );
  }
}

function mapStateToProps({ show }) {
  return {
    formatHostName,
    shows: getShowsData(show),
    showsFetching: fetchingShowsStatus(show),
    showsError: errorShowsMessage(show),
  };
}

export default connect(
  mapStateToProps,
  {
    searchShow,
  },
)(ShowBuilderShowListPage);
