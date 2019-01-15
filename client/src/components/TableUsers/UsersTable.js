import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { usersClear } from '../../actions';

import Dropdown, { DropdownItem } from '../Dropdown';
import NoResults from '../NoResults';
import Table from '../Table';

class UsersTable extends Component {
  componentWillUnmount() {
    const { usersClear } = this.props;
    usersClear();
  }

  renderHeader = () => {
    return (
      <thead>
        <tr>
          <th />
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
    );
  };

  renderBody = () => {
    const { docs } = this.props;

    return (
      <tbody>
        {docs.map(item => {
          const { _id, email, first_name, last_name, role, status } = item;

          return (
            <tr key={_id}>
              <td>
                <Dropdown type="circle">
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </Dropdown>
              </td>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>{status}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  render() {
    const { props, renderBody, renderHeader } = this;
    const { docs, loading } = props;

    return (
      <Fragment>
        {docs.length > 0 ? (
          <Table>
            {renderHeader()}
            {renderBody()}
          </Table>
        ) : docs.length === 0 ? (
          <NoResults>No Results</NoResults>
        ) : loading ? (
          <div>Loading...</div>
        ) : null}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { docs, limit, offset, page, pages, total } = state.users;

  return {
    docs,
    limit,
    offset,
    page,
    pages,
    total,
  };
}

export default connect(
  mapStateToProps,
  { usersClear },
)(UsersTable);
