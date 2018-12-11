import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class AlbumsTable extends Component {
  state = {};

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Label</th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    return (
      <tbody>
        {this.props.library.map(result => {
          if (result.type === 'album') {
            return (
              <tr key={result._id}>
                <td>{result.name}</td>
                <td>{result.label}</td>
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    );
  }

  render() {
    return (
      <Fragment>
        {this.props.library.length > 0 ? (
          <table className="table">
            {this.renderHeader()}
            {this.renderBody()}
          </table>
        ) : null}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    library: state.search.library,
  };
}

export default connect(
  mapStateToProps,
  null
)(AlbumsTable);
