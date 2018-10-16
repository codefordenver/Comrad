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

const localizer = BigCalendar.momentLocalizer(moment);

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
      events: [],
      modalStatus: false
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.eventModalShow = this.eventModalShow.bind(this);
    this.eventModalState = this.eventModalState.bind(this);
  }

  componentDidMount() {
    const setInitialEvents = async () => {
      //Change to getEvents once mongo is setup
      const eventsProps = await this.props.events;
      this.setState({ events: eventsProps });
    };

    setInitialEvents();
  }

  static getDerivedStateFromProps(props, state) {
    const { events, newEventForm } = props;
    const nextEvent = newEventForm.newEvent ? newEventForm.newEvent.values : [];
    
    return { events: events.concat(nextEvent) };
  }

  moveEvent({ event, start, end, resourceId }) {
    /*
    const { events } = this.state;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end, resourceId };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });

    console.log(this.state.events);
    */
    this.props.updateEvent(event, { start, end });
  }

  resizeEvent = ({ event, start, end, resourceId }) => {
    this.props.updateEvent(event, { start, end });
  };

  handleNewEvent = ({ start, end, resourceId }) => {
    const newEventState = {
      start,
      end,
      resourceId
    };

    this.setState({
      newEvent: newEventState
    });

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
        <DragAndDropCalendar
          selectable
          resizable
          localizer={localizer}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleNewEvent}
          resources={resourceMap}
          resourceIdAccessor={"resourceId"}
          resourceTitleAccessor="resourceTitle"
          defaultView="week"
          defaultDate={new Date(2018, 0, 29)}
        />

        {this.state.modalStatus ? (
          <EventModal
            modalStatus={this.state.modalStatus}
            parentModalState={this.eventModalState}
          >
            <EventForm event={this.state.newEvent} />
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
