import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/event";

class CalendarView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEvent: null,
      events: []
    };
  }

  componentDidMount() {
    const setInitialEvents = async () => {
      //Change to getEvents once mongo is setup
      const eventsProps = await this.props.events;
      this.setState({ events: eventsProps });
    };

    setInitialEvents();
  }

  render() {
    return (
      <div className="calendar__view">
        {this.state.events.map(event => {
          return (
            <div>
              <h1>{event.title}</h1>
              <p> Start: {event.start.toString()}</p>
              <p> End: {event.end.toString()}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  };
}

export default connect(
  mapStateToProps,
  actions
)(CalendarView);
