import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowBuilderShowListPage extends Component {
  state = {
    //TODO: add dates
  };

  render() {
    return (
      <div>
        <h1>Show List</h1>
        <div>TODO: date selectors</div>
        <div>TODO: show list</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  null,
  mapDispatchToProps,
)(ShowBuilderShowListPage);
