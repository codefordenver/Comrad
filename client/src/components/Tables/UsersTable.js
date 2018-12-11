import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class UsersTable extends Component {
  state = {};

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>On-Air Name</th>
          <th>Role</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
    );
  }

  renderBody() {
    const { filter } = this.props;

    return (
      <tbody>
        {this.props.users.map(result => {
          if (result.status === filter || filter === 'All') {
            return (
              <tr key={result._id}>
                <td>
                  {result.first_name} {result.last_name}
                </td>
                <td>{result.on_air_name}</td>
                <td>{result.role}</td>
                <td>{result.status}</td>
                <td>Buttons go here</td>
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
        {this.props.users.length > 0 ? (
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
    users: state.search.users,
  };
}

export default connect(
  mapStateToProps,
  null
)(UsersTable);
