import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import queryString from 'query-string';

import Card, { CardBody } from '../../components/Card';
import DropdownHost from '../../components/DropdownHost';
import Loading from '../../components/Loading';

import { playlistActions } from '../../redux';
import { clearShows, getShowsData, searchShow } from '../../redux/show';

class ShowBuilderPage extends Component {
  state = {
    activeTab: 'search',
  };

  componentDidMount() {
    const { location, searchShow, playlistActions } = this.props;
    const { startTime, endTime } = queryString.parse(location.search);

    //find the playlist
    playlistActions.findOne(startTime, endTime);

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
    const { playlist, shows, showFetching } = this.props;
    const {
      activeTab,
      formattedDay,
      formattedEndTime,
      formattedStartTime,
    } = this.state;

    let showName = '';
    if (shows && Object.keys(shows).length > 0) {
      if (Object.keys(shows).length > 1) {
        console.warn(
          'More than one show returned for show builder, using the first one',
        );
      }
      showName = shows[Object.keys(shows)[0]].show_details.title;
    }

    return (
      <Card>
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
              {(playlist.loading || showFetching) && <Loading />}
              <div>
                <h5>Scratchpad</h5>
              </div>
              <div>
                <h5>Saved Items</h5>
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
                    Comment content
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

function mapStateToProps({ show, playlist }) {
  return {
    playlist,
    showFetching: show.fetching,
    shows: getShowsData(show),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({ ...playlistActions }, dispatch),
    clearShows: bindActionCreators(clearShows, dispatch),
    searchShow: bindActionCreators(searchShow, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowBuilderPage);
