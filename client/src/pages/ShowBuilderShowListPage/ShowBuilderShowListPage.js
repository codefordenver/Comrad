import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  clearShows,
  errorShowsMessage,
  fetchingShowsStatus,
  getShowsData,
  searchShow,
} from '../../redux/show';
import Card, { CardBody } from '../../components/Card';
import DatePicker from '../../components/DatePicker';
import { formatHostName } from '../../utils/formatters';

class ShowBuilderShowListPage extends Component {
  state = {
    searchDate: moment().startOf('day'),
  };

  componentDidMount = () => {
    this.updateShowData();
  };

  handleDateChange = newDate => {
    const { clearShows } = this.props;

    clearShows();

    this.setState(
      {
        searchDate: moment(newDate).startOf('day'),
      },
      function() {
        this.updateShowData();
      },
    );
  };

  updateShowData = () => {
    const { searchShow } = this.props;
    const { searchDate } = this.state;

    const nextDay = searchDate.clone();
    nextDay.add(1, 'day');

    searchShow(searchDate, nextDay);
  };

  render() {
    const { formatHostName, showsFetching, shows } = this.props;
    const { searchDate } = this.state;

    let showElements = [];
    if (shows !== null) {
      let displayDate = '';
      Object.keys(shows).forEach(function(s) {
        let showObject = shows[s];
        let startTime = moment(showObject.show_start_time_utc);
        let endTime = moment(showObject.show_end_time_utc);
        let startTimeFormatted = startTime.format('LT');
        let endTimeFormatted = endTime.format('LT');
        let startTimeUtc = moment(showObject.show_start_time_utc).utc();
        let endTimeUtc = moment(showObject.show_end_time_utc).utc();
        let showUrl =
          '/show-builder/show?startTime=' +
          startTimeUtc.format() +
          '&endTime=' +
          endTimeUtc.format();
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

    let dateInput = {
      name: 'date',
      onChange: this.handleDateChange,
      value: searchDate,
    };

    return (
      <>
        <Card>
          <CardBody>
            <h1>Show List</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div>
              <DatePicker label="Date" input={dateInput} />
            </div>
            {!showsFetching && <div>{showElements}</div>}
          </CardBody>
        </Card>
      </>
    );
  }
}

function mapStateToProps({ show }) {
  return {
    formatHostName,
    shows: getShowsData(show),
    showsError: errorShowsMessage(show),
    showsFetching: fetchingShowsStatus(show),
  };
}

export default connect(
  mapStateToProps,
  {
    clearShows,
    searchShow,
  },
)(ShowBuilderShowListPage);
