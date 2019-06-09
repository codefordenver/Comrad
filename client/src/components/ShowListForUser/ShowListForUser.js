import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { showAPI } from '../../api';

import Loading from '../Loading';
import Table from '../Table';

class ShowListForUser extends Component {
  state = {
    loading: true,
    data: [],
  };

  componentWillMount() {
    const {
      currentUserId,
      endDate,
      maxItems,
      sortNewestToOldest = false,
      startDate,
    } = this.props;
    showAPI.find(startDate, endDate, currentUserId).then(response => {
      let results = response.data;
      if (sortNewestToOldest) {
        results = results.reverse();
      }
      if (maxItems != null && results.length > maxItems) {
        results = results.slice(0, maxItems);
      }
      this.setState({
        loading: false,
        data: results,
      });
    });
  }

  renderHeader = () => {
    return (
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>Show Name</th>
          <th />
          <th />
        </tr>
      </thead>
    );
  };

  renderBody = () => {
    const { data } = this.state;

    return (
      <tbody>
        {data.map(item => {
          let startTime = moment(item.start_time_utc);
          let showDate =
            startTime.format('ddd') + ', ' + startTime.format('LL');
          let endTime = moment(item.end_time_utc);
          let startTimeFormatted = startTime.format('LT');
          let endTimeFormatted = endTime.format('LT');
          let startTimeUtc = moment(item.start_time_utc).utc();
          let endTimeUtc = moment(item.end_time_utc).utc();
          let showUrl =
            '/show-builder/show?startTime=' +
            startTimeUtc.format() +
            '&endTime=' +
            endTimeUtc.format();
          return (
            <tr key={item.master_time_id}>
              <td>
                {showDate} {startTimeFormatted} - {endTimeFormatted}
              </td>
              <td>{item.show_details.title}</td>
              <td>
                <Link to={showUrl}>Show Builder</Link>
              </td>
              <td>TODO edit show instance link</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  render() {
    const { props, state, renderBody, renderHeader } = this;
    const { noItemsText } = props;
    const { loading, data } = state;

    return (
      <div className="show-list-for-user">
        {loading && <Loading />}
        {data.length > 0 ? (
          <Table>
            {renderHeader()}
            {renderBody()}
          </Table>
        ) : null}
        {!loading && data.length === 0 && <span>{noItemsText}</span>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserId: state.auth.doc._id,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ShowListForUser);
