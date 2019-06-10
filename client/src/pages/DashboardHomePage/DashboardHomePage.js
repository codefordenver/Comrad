import React, { Component } from 'react';
import moment from 'moment';

import { showAPI } from '../../api';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import ShowListForUser from '../../components/ShowListForUser';

import { formatHostName } from '../../utils/formatters';

export default class DashboardHomePage extends Component {
  state = {
    currentlyOnAir: null,
    loadingOnAirData: true,
    upNext: null,
  };

  componentDidMount() {
    this.loadCurrentlyOnAir();
  }

  loadCurrentlyOnAir = () => {
    let { currentlyOnAir, upNext } = this.state;
    const self = this;
    showAPI.find(moment(), moment().add(1, 'day')).then(function(response) {
      response.data.forEach(function(show) {
        if (
          moment(show.start_time_utc) <= moment() &&
          moment(show.end_time_utc) >= moment()
        ) {
          currentlyOnAir = show;
        } else if (upNext == null && moment(show.start_time_utc) > moment()) {
          upNext = show;
        }
      });
      self.setState({
        currentlyOnAir: currentlyOnAir,
        loadingOnAirData: false,
        upNext: upNext,
      });
    });
  };

  render() {
    const { currentlyOnAir, loadingOnAirData, upNext } = this.state;
    const today = moment();
    const todayPlus3Months = moment().add('3', 'month');
    const oneYearAgo = moment().subtract('1', 'year');
    return (
      <Card>
        <CardBody>
          <div className="dashboard">
            <div className="dashboard__upcoming-shows">
              <h2>My Upcoming Shows</h2>
              <ShowListForUser
                maxItems="3"
                startDate={today}
                endDate={todayPlus3Months}
                noItemsText="You have no upcoming shows in the next three months."
              />
            </div>
            <div className="dashboard__past-shows">
              <h2>My Past Shows</h2>
              <ShowListForUser
                maxItems="10"
                doNotIncludeNowPlaying={true}
                sortNewestToOldest={true}
                startDate={oneYearAgo}
                endDate={today}
                noItemsText="You haven't hosted any shows in the past year."
              />
            </div>
            <div className="dashboard__currently-on-air">
              <h2>Currently On Air</h2>
              {loadingOnAirData && <Loading />}
              {!loadingOnAirData && (
                <div>
                  {currentlyOnAir && (
                    <div>
                      <div className="dashboard__currently-on-air__show-title">
                        {currentlyOnAir.show_details.title}
                      </div>
                      <div>
                        {currentlyOnAir.show_details.host != null &&
                          'hosted by ' +
                            formatHostName(currentlyOnAir.show_details.host)}
                      </div>
                      <div>
                        {moment(currentlyOnAir.start_time_utc).format('LT')} -{' '}
                        {moment(currentlyOnAir.end_time_utc).format('LT')}
                      </div>
                    </div>
                  )}
                  {!currentlyOnAir && (
                    <div>There is no show currently playing.</div>
                  )}
                  {upNext && (
                    <div className="dashboard__currently-on-air__up-next">
                      <h4>Up Next</h4>
                      <div className="dashboard__currently-on-air__show-title">
                        {upNext.show_details.title}
                      </div>
                      <div>
                        {upNext.show_details.host != null &&
                          'hosted by ' +
                            formatHostName(upNext.show_details.host)}
                      </div>
                      <div>
                        {moment(upNext.start_time_utc).format('LT')} -{' '}
                        {moment(upNext.end_time_utc).format('LT')}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}
