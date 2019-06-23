import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';

import Card, { CardBody } from '../../components/Card';
import DropdownHost from '../../components/DropdownHost';

import { clearShows, getShowsData, searchShow } from '../../redux/show';

class ShowBuilderPage extends Component {
  state = {
    activeTab: 'search',
  };

  componentDidMount() {
    const { location, searchShow } = this.props;
    const { startTime, endTime } = queryString.parse(location.search);

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
    const { shows } = this.props;
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
      showName = shows['0'].show_details.title;
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
                <a href="#">Edit Show Description</a>
              </div>
            </div>

            <div className="show-builder__grid">
              <div>Scratchpad</div>
              <div>Saved Items</div>

              <div className="library-tab-container">
                <div className="library-tab-container__tabs">
                  <a
                    className={activeTab == 'search' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'search' })}
                  >
                    Search
                  </a>
                  <a
                    className={activeTab == 'voice' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'voice' })}
                  >
                    Voice
                  </a>
                  <a
                    className={activeTab == 'comment' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'comment' })}
                  >
                    Comment
                  </a>
                </div>
                {activeTab == 'search' && (
                  <div className="library-tab-container__tab-content">
                    Search content
                  </div>
                )}
                {activeTab == 'voice' && (
                  <div className="library-tab-container__tab-content">
                    Voice content
                  </div>
                )}
                {activeTab == 'comment' && (
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

function mapStateToProps({ show }) {
  return {
    shows: getShowsData(show),
  };
}

export default connect(
  mapStateToProps,
  {
    clearShows,
    searchShow,
  },
)(ShowBuilderPage);
