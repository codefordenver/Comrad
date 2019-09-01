import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { showAPI } from '../../api';

import Loading from '../Loading';
import { getShowType } from '../../utils/shows';
import { MODAL_EDIT_SHOW } from '../Shows/ShowModalController';
import { createInstanceAndEditShow, selectShow } from '../../redux/show';
import { setModalVisibility } from '../../redux/modal';
import ShowModalController from '../Shows/ShowModalController';

class ShowListForUser extends Component {
  state = {
    loading: true,
    data: [],
  };

  componentWillMount() {
    this.findShows();
  }

  componentDidMount() {
    const { setModalVisibility } = this.props;
    setModalVisibility(false, false, null);
  }

  findShows = () => {
    const {
      currentUserId,
      doNotIncludeNowPlaying = false,
      endDate,
      maxItems,
      sortNewestToOldest = false,
      startDate,
    } = this.props;
    showAPI.find(startDate, endDate, currentUserId).then(response => {
      let results = response.data;
      if (doNotIncludeNowPlaying) {
        //remove any shows that are currently playing
        for (let i = results.length - 1; i > 0; i--) {
          if (
            moment(results[i].start_time_utc) < moment() &&
            moment(results[i].end_time_utc) > moment()
          ) {
            results.splice(i, 1);
          }
        }
      }
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
  };

  showEditInstanceModal = show => {
    const {
      setModalVisibility,
      createInstanceAndEditShow,
      selectShow,
    } = this.props;
    if (getShowType(show) === 'instance') {
      selectShow(show);
      setModalVisibility(MODAL_EDIT_SHOW, true, null, this.findShows);
    } else {
      createInstanceAndEditShow(show.master_event_id._id, show).then(() => {
        setModalVisibility(MODAL_EDIT_SHOW, true, null, this.findShows);
      });
    }
  };

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
              <td>
                <a
                  href=""
                  onClick={e => {
                    e.preventDefault();
                    this.showEditInstanceModal(item);
                  }}
                >
                  Edit Show Instance
                </a>
              </td>
              <ShowModalController />
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
        {loading && <Loading displayMode="static" />}
        {data.length > 0 ? (
          <table>
            {renderHeader()}
            {renderBody()}
          </table>
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
  {
    createInstanceAndEditShow,
    selectShow,
    setModalVisibility,
  },
  null,
)(ShowListForUser);
