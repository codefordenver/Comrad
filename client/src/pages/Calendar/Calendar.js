import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions/event";
import EventForm from "./EventForm";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import EventModal from "./EventModal";

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
      events: events,
      modalStatus: false
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.eventModalShow = this.eventModalShow.bind(this);
    this.eventModalState = this.eventModalState.bind(this);
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

  handleNewEvent = ({ start, end, resourceId }) => {
    //const title = window.prompt("New Event name");
    const title = "Hi How Are You?";
    this.eventInfo();
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

  eventModalShow() {
    this.setState({
      modalStatus: true
    });
  }

  eventModalState(updatedState) {
    this.setState({
      modalStatus: updatedState
    });
  }

  render() {
    return (
      <div>
        {this.props.newEventForm.newEvent ? console.log(this.props.newEventForm.newEvent.values): null}
        <DragAndDropCalendar
          selectable
          resizable
          localizer={this.props.localizer}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.eventModalShow}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          defaultView="week"
          defaultDate={new Date(2018, 0, 29)}
        />

        {this.state.modalStatus ? (
          <EventModal
            modalStatus={this.state.modalStatus}
            parentModalState={this.eventModalState}
          >
            <EventForm />
          </EventModal>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.event,
    newEventForm: state.form
  };
}

export default connect(
  mapStateToProps,
  actions
)(Calendar);
