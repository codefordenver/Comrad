import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CalendarView from '../Calendar/CalendarView';

class Calendar extends Component {
  state = {}

  render() {
    const { url } = this.props.match;

    return (
    <main className="calendar">
      <section className="calendar__body">
        <Route exact path={`${url}/`} component={CalendarView} />
      </section>
    </main>
    )
  }
}

export default Calendar;