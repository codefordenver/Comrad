import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../actions/event';
//import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


class Calendar extends Component {
  componentDidMount(){
    this.props.getEvent();
  }

  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ]
  };

  handleGetEvent = () => {
    console.log("Event Props");
    console.log(this.props);
  };

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    return (
<<<<<<< HEAD
      <main className="calendar">Calendar Component</main>
    )
=======
      <div>
          <button className="button" onClick={this.handleGetEvent}>
            Get Event Test
          </button>

        <BigCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh" }}
        />
      </div>
    );
>>>>>>> Added calendar, event schema, initial event reducer
  }
}

function mapStateToProps(state) {
  return {
    event: state.event
  }
}

export default connect(
  mapStateToProps,
  actions
)(Calendar);


