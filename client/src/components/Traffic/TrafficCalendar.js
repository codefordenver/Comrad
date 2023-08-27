import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {
  clearShows,
  showsByTimeSlot,
  fetchingShowsStatus,
  searchShow,
} from '../../redux/show';
import { trafficActions } from '../../redux';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class TrafficCalendar extends Component {
  state = {
    searchStartDate: moment()
      .startOf('week')
      .subtract(1, 'day'),
    searchEndDate: moment()
      .endOf('week')
      .add(1, 'day'),
    shows: [],
  };

  componentDidMount() {
    this.searchShowsAndTraffic();
  }

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) => {
      if (prevProps[key] !== val) {
        if (key === 'date') {
          this.setState(
            {
              searchStartDate: moment(val).subtract(8, 'days'),
              searchEndDate: moment(val).add(8, 'days'),
            },
            function() {
              this.searchShowsAndTraffic();
            },
          );
        }
      }
    });
    Object.entries(this.state).forEach(
      ([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`),
    );
  }

  componentWillUnmount() {
    const { clearShows } = this.props;
    clearShows();
  }

  handleClickEvent = event => {
    const { history } = this.props;
    history.push('/traffic/' + event.master_time_id);
  };

  handleClickSlotEvent = slot => {
    const { history } = this.props;
    history.push('/traffic/add/' + moment(slot.start).format());
  };

  handleDateChange = dates => {
    if (Array.isArray(dates)) {
      if (dates.length === 1) {
        //For when changing days
        this.setState(
          {
            searchStartDate: moment(dates[0]).subtract(2, 'days'),
            searchEndDate: moment(dates[0]).add(2, 'days'),
          },
          function() {
            this.searchShowsAndTraffic();
          },
        );
      } else {
        //For when changing weeks
        this.setState(
          {
            searchStartDate: moment(dates[0]).subtract(8, 'days'),
            searchEndDate: moment(dates[dates.length - 1]).add(8, 'days'),
          },
          function() {
            this.searchShowsAndTraffic();
          },
        );
      }
    } else {
      //For when changing months/agenda
      this.setState(
        {
          searchStartDate: moment(dates.start).subtract(1, 'month'),
          searchEndDate: moment(dates.end).add(1, 'month'),
        },
        function() {
          this.searchShowsAndTraffic();
        },
      );
    }
  };

  handleNavigate = date => {
    if (typeof this.props.onDateChange == 'function') {
      this.props.onDateChange(date);
    }
  };

  searchShowsAndTraffic = () => {
    const { searchStartDate, searchEndDate } = this.state;
    const { searchShow, trafficActions } = this.props;
    searchShow(searchStartDate, searchEndDate);
    trafficActions.find(searchStartDate.format(), searchEndDate.format());
  };

  slotPropGetter = date => {
    const { timeSlotShows } = this.props;

    let className = '';

    let key = moment(date).format('YYYY-MM-DD HH:mm');
    if (
      (timeSlotShows != null) & (key in timeSlotShows) &&
      timeSlotShows[key].length > 0
    ) {
      className +=
        ' show-name show-name--' +
        timeSlotShows[key].replace(/[^a-zA-Z0-9]/gi, '');
      let previousShow = moment(date).subtract(10, 'minutes');
      let previousShowKey = previousShow.format('YYYY-MM-DD HH:mm');
      //add show-name--start if the next show is different, or if this time slot is the start of a day
      if (
        !(previousShowKey in timeSlotShows) ||
        timeSlotShows[previousShowKey] !== timeSlotShows[key] ||
        previousShow.dayOfYear() !== moment(date).dayOfYear()
      ) {
        className += ' show-name--start';
      }
      let nextShow = moment(date).add(10, 'minutes');
      let nextShowKey = nextShow.format('YYYY-MM-DD HH:mm');
      //add show-name--end if the next show is different, or if this time slot is the end of a day
      if (
        !(nextShowKey in timeSlotShows) ||
        timeSlotShows[nextShowKey] !== timeSlotShows[key] ||
        nextShow.dayOfYear() !== moment(date).dayOfYear()
      ) {
        className += ' show-name--end';
      }
    }

    return {
      className,
    };
  };

  handleNavigate = date => {
    if (typeof this.props.onDateChange == 'function') {
      this.props.onDateChange(date);
    }
  };

  render() {
    const { date, timeSlotShows, traffic } = this.props;
    const localizer = momentLocalizer(moment);

    //if date provided in properties, always have the calendar display that date
    let calendarDateProperty = typeof date == 'undefined' ? {} : { date: date };

    let showNameClasses = '';
    let showNamesUsed = [];
    if (timeSlotShows != null) {
      Object.keys(timeSlotShows).forEach(key => {
        let tss = timeSlotShows[key];
        if (showNamesUsed.indexOf(tss) === -1) {
          showNamesUsed.push(tss);
          showNameClasses +=
            '.rbc-day-slot .show-name--' +
            tss.replace(/[^a-zA-Z0-9]/gi, '') +
            '.show-name--start::before{content: "' +
            tss.replace('"', '\\"') +
            '"}';
        }
      });
    }

    return (
      <div className="traffic-calendar">
        <style type="text/css">{showNameClasses}</style>
        <BigCalendar
          selectable
          localizer={localizer}
          events={traffic}
          formats={{
            eventTimeRangeFormat: function(dates) {
              return moment(dates.start).format('h:mm');
            },
          }}
          views={[Views.WEEK, Views.DAY]}
          defaultView={Views.WEEK}
          defaultDate={new Date()}
          {...calendarDateProperty}
          titleAccessor={traffic => traffic.traffic_details.title}
          startAccessor={traffic => new Date(traffic.start_time_utc)}
          endAccessor={traffic => {
            let end = new Date(traffic.end_time_utc);
            // check if event ends at midnight, and traffic this 1 minute earlier so it doesn't overlap into the next day
            if (end.getHours() === 0 && end.getMinutes() === 0) {
              end.setMinutes(end.getMinutes() - 1)
            }
            return end;
          }}
          eventPropGetter={traffic => {
            return {
              className:
                'event--' +
                traffic.traffic_details.type.toLowerCase().replace(' ', '-') +
                (moment(traffic.start_time_utc)
                  .subtract(10, 'minutes')
                  .dayOfYear() !== moment(traffic.start_time_utc).dayOfYear()
                  ? ' rbc-event--in-first-10-minutes'
                  : ''),
            };
          }}
          slotPropGetter={this.slotPropGetter}
          onNavigate={date => this.handleNavigate(date)}
          onSelectEvent={event => this.handleClickEvent(event)}
          onSelectSlot={slot => this.handleClickSlotEvent(slot)}
          step={10}
          showMultiDayTimes
          onSelecting={slot => false}
        />
      </div>
    );
  }
}

function mapStateToProps({ show, traffic }) {
  return {
    traffic: traffic.docs,
    timeSlotShows: showsByTimeSlot(show),
    showsFetching: fetchingShowsStatus(show),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearShows: bindActionCreators(clearShows, dispatch),
    fetchingShowsStatus: bindActionCreators(fetchingShowsStatus, dispatch),
    searchShow: bindActionCreators(searchShow, dispatch),
    showsByTimeSlot: bindActionCreators(showsByTimeSlot, dispatch),
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrafficCalendar);
