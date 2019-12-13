import React, { Component } from 'react';
import './CalendarAgenda.scss';
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
        } else if (moment(show.start_time_utc > moment())) {
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
        });
      });
  };

  handleShowMore() {
    const { allNext, showItems, day } = this.state;
    const self = this;
    let timeFrame = day;
    let futureShows = [];
    if (showItems === allNext.length) {
      console.log('api');
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
          console.log(futureShows);
        });
      let addFive = showItems + 5;
      self.setState({
        allNext: futureShows,
        day: timeFrame,
        showItems: addFive,
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
      upNext,
      allNext,
      showItems,
    } = this.state;
    const allShows = allNext.slice(0, showItems).map((show, i) => {
      return (
        <div key={i}>
          <h4 className="text-center">{show.show_details.title}</h4>
          <div className="up-next__host-name">
            {show.show_details.host != null &&
              'hosted by ' + formatHostName(show.show_details.host)}
          </div>
          <div className="up-next__show-time">
            {moment(show.start_time_utc).format('LT')} -{' '}
            {moment(show.end_time_utc).format('LT')}
          </div>
        </div>
      );
    });

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
                    {showItems === 0 ? (
                      <div className="load-more-button">
                        <Button onClick={this.handleShowMore}>Load more</Button>
                      </div>
                    ) : (
                      <>
                        {allShows}
                        <div className="load-more-button">
                          <Button onClick={this.handleShowMore}>
                            Load more
                          </Button>
                        </div>
                      </>
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
