import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import queryString from 'query-string';

import Card, { CardBody } from '../../components/Card';
import DropdownHost from '../../components/DropdownHost';
import FormShowBuilderComment from '../../components/forms/FormShowBuilderComment';
import Loading from '../../components/Loading';
import ShowBuilderItemList from '../../components/ShowBuilderItemList';

import { playlistActions } from '../../redux';
import { clearShows, getShowsData, searchShow } from '../../redux/show';
import { trafficActions } from '../../redux';

class ShowBuilderPage extends Component {
  state = {
    activeTab: 'search',
  };

  componentDidMount() {
    const {
      location,
      searchShow,
      playlistActions,
      trafficActions,
    } = this.props;
    const { startTime, endTime } = queryString.parse(location.search);

    //find the playlist
    playlistActions.findOrCreateOne(startTime, endTime);

    //find traffic events during the show
    trafficActions.find(startTime, endTime);

    // format the show day/time

    const startTimeMoment = moment(startTime);
    const endTimeMoment = moment(endTime);

    let showDate = startTimeMoment.format('LL');
    showDate = showDate.substring(0, showDate.lastIndexOf(',')); // format as "March 3"

    this.setState({
      formattedDay: startTimeMoment.format('dddd') + ', ' + showDate,
      formattedStartTime: startTimeMoment.format('LT'),
      formattedEndTime: endTimeMoment.format('LT'),
    });

    // find the show that the query string represents
    endTimeMoment.subtract(1, 'minute'); //take a minute off, so we don't get the next show from the API
    searchShow(startTimeMoment, endTimeMoment);
  }

  componentWillUnmount() {
    const { clearShows } = this.props;
    clearShows();
  }

  render() {
    const { playlist, shows, showFetching, traffic } = this.props;
    const {
      activeTab,
      formattedDay,
      formattedEndTime,
      formattedStartTime,
    } = this.state;
    let { scratchpad, saved_items } = playlist.doc;

    let showName = '';
    if (shows && Object.keys(shows).length > 0) {
      if (Object.keys(shows).length > 1) {
        console.warn(
          'More than one show returned for show builder, using the first one',
        );
      }
      showName = shows[Object.keys(shows)[0]].show_details.title;
    }

    let scratchpadForDisplay = [];
    let savedItemsForDisplay = [];

    if (
      !traffic.loading &&
      !playlist.loading &&
      typeof scratchpad !== 'undefined' &&
      typeof saved_items !== 'undefined'
    ) {
      scratchpadForDisplay = [...scratchpad];
      //modify the scratchpad list based on what traffic occurs at the time period
      //we will add any traffic itemsnot accounted for to scratchpad
      let trafficItemsForScratchpad = [...traffic.docs];
      saved_items.forEach(si => {
        if (si.type === 'traffic') {
          let matchingIndex = trafficItemsForScratchpad.findIndex(
            a => a.master_time_id === si.traffic.master_time_id,
          );
          trafficItemsForScratchpad.splice(matchingIndex, 1);
        }
      });
      trafficItemsForScratchpad.reverse();
      trafficItemsForScratchpad.forEach(t => {
        scratchpadForDisplay.unshift({
          type: 'traffic',
          traffic: t,
        });
      });
    }

    if (typeof saved_items !== 'undefined') {
      savedItemsForDisplay = [...saved_items];
      savedItemsForDisplay.reverse(); //display saved items in reverse chronological order
    }

    return (
      <Card className="card--show-builder">
        {playlist.saving && (
          <div className="card--show-builder__saving-overlay" />
        )}
        <CardBody>
          <div className="show-builder">
            <div className="show-builder__top-row">
              <div>
                <DropdownHost />
              </div>
              <div>{showName}</div>
              <div>
                {formattedDay}
                <br />
                {formattedStartTime} - {formattedEndTime}
                <br />
                <div className="edit-show-description">
                  Edit Show Description
                </div>
              </div>
            </div>

            <div className="show-builder__grid">
              {(playlist.loading || showFetching || traffic.loading) && (
                <Loading />
              )}
              <div>
                <h5>Scratchpad</h5>
                {!playlist.loading &&
                  !traffic.loading &&
                  typeof scratchpad !== 'undefined' && (
                    <ShowBuilderItemList items={scratchpadForDisplay} />
                  )}
              </div>
              <div>
                <h5>Saved Items</h5>
                {!playlist.loading &&
                  !traffic.loading &&
                  typeof saved_items !== 'undefined' && (
                    <ShowBuilderItemList items={savedItemsForDisplay} />
                  )}
              </div>

              <div className="library-tab-container">
                <div className="library-tab-container__tabs">
                  <div
                    className={activeTab === 'search' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'search' })}
                  >
                    Search
                  </div>
                  <div
                    className={activeTab === 'voice' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'voice' })}
                  >
                    Voice
                  </div>
                  <div
                    className={activeTab === 'comment' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'comment' })}
                  >
                    Comment
                  </div>
                </div>
                {activeTab === 'search' && (
                  <div className="library-tab-container__tab-content">
                    Search content
                  </div>
                )}
                {activeTab === 'voice' && (
                  <div className="library-tab-container__tab-content">
                    Voice content
                  </div>
                )}
                {activeTab === 'comment' && (
                  <div className="library-tab-container__tab-content">
                    <FormShowBuilderComment />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps({ show, playlist, traffic }) {
  return {
    playlist,
    showFetching: show.fetching,
    shows: getShowsData(show),
    traffic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({ ...playlistActions }, dispatch),
    clearShows: bindActionCreators(clearShows, dispatch),
    searchShow: bindActionCreators(searchShow, dispatch),
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowBuilderPage);
