import React, { Component } from 'react';
import './CalendarAgenda.scss';
import moment from 'moment';
import { showAPI } from '../../api';
import Loading from '../../components/Loading';
import { formatHostName } from '../../utils/formatters';

class CalendarAgenda extends Component {
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
      <>
        <h2>Calendar Agenda</h2>
        <div className="shows-container">
          <div className="show-container previous">
            <h2>Previous show</h2>
          </div>
          <div className="show-container current">
            <h2>Current show</h2>
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
                  <div>No Show On Air</div>
                )}
              </>
            ) : (
              <Loading displayMode="static" />
            )}
          </div>
          <div className="show-container next">
            <h2>Next shows</h2>
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
