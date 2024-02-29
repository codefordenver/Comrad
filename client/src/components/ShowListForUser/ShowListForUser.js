import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { showAPI } from '../../api';

import Loading from '../Loading';
import { getShowType } from '../../utils/shows';
import { MODAL_EDIT_SHOW } from '../Shows/ShowModalController';
import { createInstanceShow, selectShow } from '../../redux/show';
import { setModalVisibility } from '../../redux/modal';
import ShowModalController from '../Shows/ShowModalController';
import { playlistActions } from '../../redux';
import { getShowRecordingUrl } from '../../utils/shows';

class ShowListForUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      userId: props.currentUserId,
      showAddToScratchpadButton: props.showAddToScratchpadButton,
    };
  }

  componentWillMount() {
    const { currentUserId } = this.props;
    if (currentUserId != null) {
      this.findShows();
    }
  }

  componentDidMount() {
    const { setModalVisibility } = this.props;
    setModalVisibility(false, false, null);
  }

  componentDidUpdate() {
    const { currentUserId } = this.props;
    if (
      typeof currentUserId !== 'undefined' &&
      currentUserId !== this.state.userId
    ) {
      this.findShows();
    }
    if (this.state.userId !== currentUserId) {
      this.setState({ userId: currentUserId });
      this.findShows();
    }
  }

  findShows = () => {
    const {
      currentUserId,
      doNotIncludeNowPlaying = false,
      hostGroups,
      endDate,
      maxItems,
      sortNewestToOldest = false,
      startDate,
    } = this.props;
    let hostsToSearch = currentUserId;
    if (hostGroups != null && hostGroups.length > 0) {
      hostsToSearch = [currentUserId];
      hostGroups.forEach(hg => {
        hostsToSearch.push(hg._id);
      });
    }
    showAPI.find(startDate, endDate, hostsToSearch).then(response => {
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
    const { setModalVisibility, createInstanceShow, selectShow } = this.props;
    if (getShowType(show) === 'instance') {
      selectShow(show);
      setModalVisibility(MODAL_EDIT_SHOW, true, null, this.findShows);
    } else {
      createInstanceShow(show.master_event_id._id, show).then(() => {
        setModalVisibility(MODAL_EDIT_SHOW, true, null, this.findShows);
      });
    }
  };

  addToScratchpad(data) {
    let startTime = data.start_time_utc;
    let endTime = data.end_time_utc;
    let { trackId, playlistActions } = this.props;
    playlistActions.findOrCreateOne(startTime, endTime, function(playlist) {
      playlistActions.addTrackToScratchpad(playlist._id, trackId);
    });
    this.props.addToScratchpadSuccess();
  }

  renderHeader = () => {
    return (
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>Show Name</th>
          <th />
          <th />
          <th />
        </tr>
      </thead>
    );
  };

  renderBody = () => {
    const { data, showAddToScratchpadButton } = this.state;

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
              {!showAddToScratchpadButton && (
                <>
                  <td>
                    <Link to={showUrl}>Show Builder</Link>
                  </td>
                  <td>
                    <span
                      className="show-list-for-user__edit-show-instance"
                      onClick={e => this.showEditInstanceModal(item)}
                    >
                      Edit Show Instance
                    </span>
                  </td>
                  <td>
                    {item.show_details?.custom?.record_audio && new Date(item.end_time_utc) < new Date() && 
                      <a href={getShowRecordingUrl(item)} target="_blank">Recording</a>}
                  </td>
                </>
              )}
              {showAddToScratchpadButton && (
                <td>
                  <span
                    className="show-list-for-user__edit-show-instance"
                    onClick={e => this.addToScratchpad(item)}
                  >
                    Add To Scratchpad
                  </span>
                </td>
              )}
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
          <table className="base-table-style">
            {renderHeader()}
            {renderBody()}
          </table>
        ) : null}
        {!loading && data.length === 0 && <span>{noItemsText}</span>}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentUserId:
      ownProps.userId != null ? ownProps.userId : state.auth.doc._id,
    hostGroups: ownProps.userId
      ? ownProps.hostGroups
      : state.auth.doc.host_groups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({ ...playlistActions }, dispatch),
    createInstanceShow: bindActionCreators(createInstanceShow, dispatch),
    selectShow: bindActionCreators(selectShow, dispatch),
    setModalVisibility: bindActionCreators(setModalVisibility, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowListForUser);
