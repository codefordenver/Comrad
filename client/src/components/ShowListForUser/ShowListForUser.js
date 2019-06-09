import React, { Component } from 'react';
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
    const { currentUserId, endDate, maxItems, startDate } = this.props;
    showAPI.find(startDate, endDate, currentUserId).then(response => {
      const results = response.data;
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
          let showDate = item.start_time_utc.format('LL');
          return (
            <tr key={item.master_time_id}>
              <td>date time</td>
              <td>{item.show_details.title}</td>
              <td>show builder link</td>
              <td>edit details link</td>
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
