import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/shows";
import _ from "lodash";
import moment from "moment";
import EventNew from "../../components/Events/EventNew";

class CalendarHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newShow: null,
      shows: {}
    };
  }

  componentDidMount() {
    const setInitialShows = async () => {
      //Change to getShows once mongo is setup
      const showsProps = await this.props.shows;
      this.setState({ shows: showsProps });
    };

    setInitialShows();
  }

  render() {
    return (
      <div className="calendar__view">
        <EventNew />

        {this.props.shows
          ? _.map(this.props.shows, show => {
              return (
                <div key={show._id}>
                  <h1>{show.show_details.title}</h1>
                  <p>Start Time: {moment(show.show_start_time_utc).format("hh:mm a")} </p>
                  <p>End Time: {moment(show.show_end_time_utc).format("hh:mm a")}</p>

                  <h2>Repeat Rules</h2>
                  <p>Show Start Date: {show.repeat_rule.repeat_start_date}</p>
                  <p>Show End Date: {show.repeat_rule.repeat_end_date}</p>
                </div>
              );
            })
          : ""}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shows: state.shows,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(CalendarHomePage);
