import React, { Component } from 'react';
import moment from 'moment';
import { showAPI } from '../../api';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import { formatHostName } from '../../utils/formatters';

class CalendarAgenda extends Component {
  constructor(props) {
    super(props);
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  state = {
    previouslyOnAir: null,
    currentlyOnAir: null,
    loadingOnAirData: true,
    loadingPreviouslyOnAirData: true,
    upNext: null,
    allNext: [],
    showItems: 0,
    day: 1,
  };

  componentDidMount() {
    this.loadCurrentlyOnAir();
    this.loadPreviouslyOnAir();
  }

  loadCurrentlyOnAir = () => {
    let { currentlyOnAir, upNext } = this.state;
    const self = this;
    let futureShows = [];
    showAPI.find(moment(), moment().add(1, 'day')).then(function(response) {
      response.data.forEach(function(show) {
        if (
          moment(show.start_time_utc) <= moment() &&
          moment(show.end_time_utc) >= moment()
        ) {
          currentlyOnAir = show;
        } else if (moment(show.start_time_utc) > moment()) {
          futureShows.push(show);
        }
      });
      futureShows.sort(function(a, b) {
        return new Date(a.start_time_utc) - new Date(b.start_time_utc);
      });
      upNext = futureShows[0];
      let allNextShows = futureShows.slice(1, futureShows.length);
      self.setState({
        currentlyOnAir: currentlyOnAir,
        loadingOnAirData: false,
        upNext: upNext,
        allNext: allNextShows,
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
            return new Date(b.end_time_utc) - new Date(a.end_time_utc);
          });
          for (let i = 0; i < showsArray.length; i++) {
            if (moment(showsArray[i].end_time_utc) < moment()) {
              return (previouslyOnAir = showsArray[i]);
            }
          }
        });
        self.setState({
          previouslyOnAir: previouslyOnAir,
          loadingPreviouslyOnAirData: false,
        });
      });
  };

  handleShowMore() {
    const { allNext, showItems, day } = this.state;
    const self = this;
    let timeFrame = day;
    let futureShows = [];
    if (showItems === allNext.length) {
      timeFrame++;
      showAPI
        .find(moment(), moment().add(timeFrame, 'day'))
        .then(function(response) {
          for (let i = 0; i < response.data.length; i++) {
            if (moment(response.data[i].start_time_utc) > moment()) {
              futureShows.push(response.data[i]);
            }
          }
          futureShows.sort(function(a, b) {
            return new Date(a.start_time_utc) - new Date(b.start_time_utc);
          });
          let addFive = showItems + 5;
          self.setState({
            allNext: futureShows,
            day: timeFrame,
            showItems: addFive,
            upNext: false, // unset upNext, since it will now be included in allNext
          });
        });
    } else if (showItems < allNext.length) {
      if (showItems + 5 > allNext.length) {
        this.setState({ showItems: allNext.length });
      } else {
        this.setState({ showItems: showItems + 5 });
      }
    }
  }

  render() {
    const {
      previouslyOnAir,
      currentlyOnAir,
      loadingOnAirData,
      loadingPreviouslyOnAirData,
      upNext,
      allNext,
      showItems,
    } = this.state;
    let previousShowTime;
    const allShows = allNext.slice(0, showItems).map((show, i) => {
      let dayHeader = <></>;
      if (
        previousShowTime != null &&
        previousShowTime.format('dddd, MMMM D') !==
          moment(show.start_time_utc).format('dddd, MMMM D')
      ) {
        dayHeader = (
          <div className="calendar-agenda__grid__day-header">
            {moment(show.start_time_utc).format('dddd, MMMM D')}
          </div>
        );
      }
      previousShowTime = moment(show.start_time_utc);
      return (
        <>
          <div className="calendar-agenda__grid__show-time">
            {moment(show.start_time_utc).format('LT')}
          </div>
          <div>
            <div className="calendar-agenda__grid__show-title">
              {show.show_details.title}
            </div>
            {show.show_details.host != null && (
              <div>hosted by {formatHostName(show.show_details.host)}</div>
            )}
          </div>
          {dayHeader}
        </>
      );
    });

    return (
      <>
        <h2 className="mb-1">Show Schedule</h2>
        <div className="calendar-agenda">
          {!loadingOnAirData && !loadingPreviouslyOnAirData ? (
            <>
              <div className="calendar-agenda__grid mb-1">
                {previouslyOnAir && (
                  <>
                    <div className="calendar-agenda__grid__show-time">
                      {moment(previouslyOnAir.start_time_utc).format('LT')}
                    </div>

                    <div>
                      <div className="calendar-agenda__grid__show-title">
                        {previouslyOnAir.show_details.title}
                      </div>
                      {previouslyOnAir.show_details.host != null && (
                        <div>
                          hosted by{' '}
                          {formatHostName(previouslyOnAir.show_details.host)}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {currentlyOnAir && (
                  <>
                    <div className="calendar-agenda__grid__show-time">
                      {moment(currentlyOnAir.start_time_utc).format('LT')}
                    </div>

                    <div>
                      <div className="calendar-agenda__grid__show-title">
                        {currentlyOnAir.show_details.title}
                      </div>
                      {currentlyOnAir.show_details.host != null && (
                        <div>
                          hosted by{' '}
                          {formatHostName(currentlyOnAir.show_details.host)}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {upNext && (
                  <>
                    <div className="calendar-agenda__grid__show-time">
                      {moment(upNext.start_time_utc).format('LT')}
                    </div>
                    <div className="">
                      <div className="calendar-agenda__grid__show-title">
                        {upNext.show_details.title}
                      </div>
                      {upNext.show_details.host != null && (
                        <div>
                          hosted by {formatHostName(upNext.show_details.host)}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {showItems > 0 && allShows}
              </div>
              <div className="load-more-button">
                <Button onClick={this.handleShowMore}>Load more</Button>
              </div>
            </>
          ) : (
            <Loading displayMode="static" />
          )}
        </div>
      </>
    );
  }
}

export default CalendarAgenda;
