import React, { Component } from 'react';
import './CalendarAgenda.scss';
import moment from 'moment';
import { showAPI } from '../../api';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import { formatHostName } from '../../utils/formatters';

class CalendarAgenda extends Component {
  state = {
    previouslyOnAir: null,
    currentlyOnAir: null,
    loadingOnAirData: true,
    upNext: null,
    allNext: null,
    showAll: false,
  };

  componentDidMount() {
    this.loadCurrentlyOnAir();
    this.loadPreviouslyOnAir();
  }

  loadCurrentlyOnAir = () => {
    let { currentlyOnAir, upNext } = this.state;
    const self = this;
    let showsArray = [];
    showAPI.find(moment(), moment().add(1, 'day')).then(function(response) {
      response.data.forEach(function(show) {
        if (
          moment(show.start_time_utc) <= moment() &&
          moment(show.end_time_utc) >= moment()
        ) {
          currentlyOnAir = show;
        } else if (upNext == null && moment(show.start_time_utc) > moment()) {
          upNext = show;
          showsArray = response.data;
          showsArray.sort(function(a, b) {
            return new Date(a.end_time_utc) - new Date(b.end_time_utc);
          });
          let index = response.data.indexOf(upNext);
          showsArray = showsArray.slice(index + 1, response.data.length);
        }
      });
      self.setState({
        currentlyOnAir: currentlyOnAir,
        loadingOnAirData: false,
        upNext: upNext,
        allNext: showsArray,
      });
    });
  };

  loadPreviouslyOnAir = () => {
    let { previouslyOnAir } = this.state;
    const self = this;
    showAPI
      .find(moment().subtract(1, 'day'), moment())
      .then(function(response) {
        response.data.forEach(function() {
          let showsArray = response.data;
          showsArray.sort(function(a, b) {
            return new Date(a.end_time_utc) - new Date(b.end_time_utc);
          });
          previouslyOnAir = showsArray[showsArray.length - 2];
        });
        self.setState({
          previouslyOnAir: previouslyOnAir,
        });
      });
  };

  render() {
    const {
      previouslyOnAir,
      currentlyOnAir,
      loadingOnAirData,
      upNext,
      allNext,
      showAll,
    } = this.state;
    const today = moment();
    const todayPlus3Months = moment().add('3', 'month');
    const oneYearAgo = moment().subtract('1', 'year');

    return (
      <>
        <h2 className="text-center">Calendar Agenda</h2>
        <div className="shows-container">
          <div className="show-container previous">
            <h2 className="text-center">Previous show</h2>
            {!loadingOnAirData ? (
              <>
                {previouslyOnAir ? (
                  <>
                    <h4 className="text-center">
                      {previouslyOnAir.show_details.title}
                    </h4>

                    <div className="currently-on-air__host-name">
                      {previouslyOnAir.show_details.host != null &&
                        'hosted by ' +
                          formatHostName(previouslyOnAir.show_details.host)}
                    </div>

                    <div className="currently-on-air__show-time">
                      {moment(previouslyOnAir.start_time_utc).format('LT')} -{' '}
                      {moment(previouslyOnAir.end_time_utc).format('LT')}
                    </div>
                  </>
                ) : (
                  <div>No previous shows</div>
                )}
              </>
            ) : (
              <Loading displayMode="static" />
            )}
          </div>
          <div className="show-container current">
            <h2 className="text-center">Current show</h2>
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
                  <div className="text-center">No Show On Air</div>
                )}
              </>
            ) : (
              <Loading displayMode="static" />
            )}
          </div>
          <div className="show-container next">
            <h2 className="text-center">Next shows</h2>
            {!loadingOnAirData ? (
              <>
                {upNext && (
                  <>
                    <h4 className="text-center">{upNext.show_details.title}</h4>
                    <div className="up-next__host-name">
                      {upNext.show_details.host != null &&
                        'hosted by ' + formatHostName(upNext.show_details.host)}
                    </div>
                    <div className="up-next__show-time">
                      {moment(upNext.start_time_utc).format('LT')} -{' '}
                      {moment(upNext.end_time_utc).format('LT')}
                    </div>
                    {showAll === false ? (
                      <div className="load-more-button">
                        <Button
                          onClick={() => this.setState({ showAll: true })}
                        >
                          Load more
                        </Button>
                      </div>
                    ) : (
                      allNext.map(show => {
                        return (
                          <>
                            <h4 className="text-center">
                              {show.show_details.title}
                            </h4>
                            <div className="up-next__host-name">
                              {show.show_details.host != null &&
                                'hosted by ' +
                                  formatHostName(show.show_details.host)}
                            </div>
                            <div className="up-next__show-time">
                              {moment(show.start_time_utc).format('LT')} -{' '}
                              {moment(show.end_time_utc).format('LT')}
                            </div>
                          </>
                        );
                      })
                    )}
                  </>
                )}
              </>
            ) : (
              <Loading displayMode="static" />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CalendarAgenda;
