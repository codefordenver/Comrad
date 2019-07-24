import React, { Component } from 'react';
import moment from 'moment';

import { showAPI } from '../../api';

import CalendarAgenda from '../../components/CalendarAgenda';
import Card, { CardBody } from '../../components/Card';
import LargeText from '../../components/LargeText';
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
      <div className="dhp">
        <Card className="dhp__section-1">
          <CardBody>
            <div className="upcoming-shows">
              <h2>My Upcoming Shows</h2>
              <ShowListForUser
                maxItems="3"
                startDate={today}
                endDate={todayPlus3Months}
                noItemsText="You have no upcoming shows in the next three months."
              />
            </div>
          </CardBody>
        </Card>

        <Card className="dhp__section-2">
          <CardBody>
            <div className="past-shows">
              <h2>My Past Shows</h2>
              {!loadingOnAirData ? (
                <ShowListForUser
                  maxItems="10"
                  doNotIncludeNowPlaying={true}
                  sortNewestToOldest={true}
                  startDate={oneYearAgo}
                  endDate={today}
                  noItemsText="You haven't hosted any shows in the past year."
                />
              ) : (
                <Loading displayMode="static" />
              )}
            </div>
          </CardBody>
        </Card>

        <>
          <Card className="dhp__section-3">
            <CardBody>
              <div className="currently-on-air">
                <h2 className="text-center  mb-1">Currently On Air</h2>
                {!loadingOnAirData ? (
                  <>
                    {currentlyOnAir ? (
                      <>
                        <h4 className="text-center">
                          {currentlyOnAir.show_details.title}
                        </h4>

                        <div className="currently-on-air__host-name">
                          {currentlyOnAir.show_details.host != null &&
                            'hosted by ' +
                              formatHostName(currentlyOnAir.show_details.host)}
                        </div>

                        <div className="currently-on-air__show-time">
                          {moment(currentlyOnAir.start_time_utc).format('LT')} -{' '}
                          {moment(currentlyOnAir.end_time_utc).format('LT')}
                        </div>
                      </>
                    ) : (
                      <LargeText align="center">No Show On Air</LargeText>
                    )}
                  </>
                ) : (
                  <Loading displayMode="static" />
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="dhp__section-4">
            <CardBody>
              <div className="up-next">
                <h2 className="mb-1 text-center">Up Next</h2>
                {!loadingOnAirData ? (
                  <>
                    {upNext && (
                      <>
                        <h4 className="text-center">
                          {upNext.show_details.title}
                        </h4>
                        <div className="up-next__host-name">
                          {upNext.show_details.host != null &&
                            'hosted by ' +
                              formatHostName(upNext.show_details.host)}
                        </div>
                        <div className="up-next__show-time">
                          {moment(upNext.start_time_utc).format('LT')} -{' '}
                          {moment(upNext.end_time_utc).format('LT')}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <Loading displayMode="static" />
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="dhp__section-5">
            <CardBody>
              <div>
                {!loadingOnAirData ? (
                  <CalendarAgenda />
                ) : (
                  <Loading displayMode="static" />
                )}
              </div>
            </CardBody>
          </Card>
        </>
      </div>
    );
  }
}
