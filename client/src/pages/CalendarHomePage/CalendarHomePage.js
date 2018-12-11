import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/shows';

class CalendarHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newShow: null,
      shows: [],
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
        {this.state.shows.map(show => {
          return (
            <div>
              <h1>{show.title}</h1>
              <p> Start: {show.start.toString()}</p>
              <p> End: {show.end.toString()}</p>
            </div>
          );
        })}
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
  actions
)(CalendarHomePage);
