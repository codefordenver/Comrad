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



const resourceMap = [
  { resourceId: 1, resourceTitle: "Schedule" },
  { resourceId: 2, resourceTitle: "Traffic" }
];

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEvent: null,
      events: null,
      modalStatus: false
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.eventModalShow = this.eventModalShow.bind(this);
    this.eventModalState = this.eventModalState.bind(this);
  }

  moveEvent({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) {
    console.log(event);
    const { events } = this.props;

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
    const { events } = this.props;

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
    console.log(this.props.events);
    console.log(start, end);
      this.setState({
        newEvent:
          {
            start,
            end,
            resourceId
          }
      });
    console.log("NewEvent: " + this.state.newEvent);

    this.eventModalShow();
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
          events={this.props.events ?this.props.events: null}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleNewEvent}
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
            <EventForm
              event = {this.state.newEvent} />
          </EventModal>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    newEventForm: state.form
  };
}

export default connect(
  mapStateToProps,
  actions
)(Calendar);
