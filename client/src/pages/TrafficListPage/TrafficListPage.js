import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { trafficActions } from '../../redux';
import {
  clearShows,
  errorShowsMessage,
  fetchingShowsStatus,
  getShowsData,
  searchShow,
} from '../../redux/show';
import Card, { CardBody } from '../../components/Card';
import DatePicker from '../../components/DatePicker';

class TrafficListPage extends Component {
  state = {
    searchDate: moment().startOf('day'),
  };

  componentDidMount = () => {
    this.updateListData();
  };

  componentWillUnmount() {
    const { trafficActions, clearShows } = this.props;
    trafficActions.clear();
    clearShows();
  }

  handleDateChange = newDate => {
    const { trafficActions, clearShows } = this.props;

    trafficActions.clear();
    clearShows();

    this.setState(
      {
        searchDate: moment(newDate).startOf('day'),
      },
      function() {
        this.updateListData();
      },
    );
  };

  updateListData = () => {
    const { trafficActions, searchShow, traffic } = this.props;
    const { searchDate } = this.state;

    const nextDay = searchDate.clone();
    nextDay.add(1, 'day');

    trafficActions.find(searchDate.format(), nextDay.format());
    searchShow(searchDate, nextDay);
  };

  render() {
    const { traffic, showsFetching, shows } = this.props;
    const { searchDate } = this.state;

    let listElements = [];
    if (shows !== null && traffic.docs !== null) {
      let displayDate = '';
      Object.keys(shows).forEach(function(s) {
        let showObject = shows[s];
        let startTime = moment(showObject.start_time_utc);
        let endTime = moment(showObject.end_time_utc);
        let startTimeFormatted = startTime.format('LT');
        let endTimeFormatted = endTime.format('LT');
        let startTimeUtc = moment(showObject.start_time_utc).utc();
        let endTimeUtc = moment(showObject.end_time_utc).utc();
        let showDate = startTime.format('LL');
        showDate = showDate.substring(0, showDate.lastIndexOf(',')); // format as "March 3"
        listElements.push(
          <div className="traffic-list__show" key={'show-' + s}>
            <h2>{showObject.show_details.title}</h2>
            <span>
              {startTimeFormatted} - {endTimeFormatted}
            </span>
          </div>,
        );
      });
      Object.keys(traffic.docs).forEach(t => {
        let trafficObject = traffic.docs[t];
        listElements.push(<div>{trafficObject.traffic_details.title}</div>);
      });
    }

    let dateInput = {
      name: 'date',
      onChange: this.handleDateChange,
      value: searchDate,
    };

    return (
      <div className="traffic-list">
        <Card>
          <CardBody>
            <h1>Traffic List</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="traffic-list__date-selector">
              <DatePicker label="Date" input={dateInput} />
            </div>
            {!showsFetching && !traffic.loading && (
              <div className="traffic-list__events">{listElements}</div>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ show, traffic }) {
  return {
    shows: getShowsData(show),
    showsError: errorShowsMessage(show),
    showsFetching: fetchingShowsStatus(show),
    traffic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearShows: bindActionCreators(clearShows, dispatch),
    searchShow: bindActionCreators(searchShow, dispatch),
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrafficListPage);
