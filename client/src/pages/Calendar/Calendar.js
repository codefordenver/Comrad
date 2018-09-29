import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions/event";
import EventForm from "./EventForm";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const events = [
  {
    id: 0,
    title: "Event 1",
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1
  },
  {
    id: 1,
    title: "Event 2",
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2
  },
  {
    id: 2,
    title: "Event 3",
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 1
  },
  {
    id: 11,
    title: "Event 4",
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 2
  }
];

const resourceMap = [
  { resourceId: 1, resourceTitle: "Schedule" },
  { resourceId: 2, resourceTitle: "Traffic" }
];

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: events
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.props.getEvent();
  }

  moveEvent({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) {
    console.log(event);
    const { events } = this.state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, resourceId, allDay };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    console.log(updatedEvent);
    this.setState({
      events: nextEvents
    });
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      events: nextEvents
    });
  };

  handleSelect = ({ start, end, resourceId }) => {
    const title = window.prompt("New Event name");
    console.log(this.state.events);
    console.log(start, end, title);
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
            resourceId
          }
        ]
      });
  };

  render() {
    return (
      <div>
        <EventForm />

        <DragAndDropCalendar
          selectable
          localizer={this.props.localizer}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          resizable
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          onEventResize={this.resizeEvent}
          defaultView="day"
          defaultDate={new Date(2018, 0, 29)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.event
  };
}

export default connect(
  mapStateToProps,
  actions
)(Calendar);
