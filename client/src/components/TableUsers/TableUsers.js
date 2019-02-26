import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export const USER_PERMISSIONS = {
  admin: 'Admin',
  full_access: 'Full Access',
  show_producer: 'Show Producer',
  underwriting: 'Underwriting',
};

export const USER_STATUS = {
  active: {
    class: 'active',
    text: 'Active',
  },
  inactive: {
    class: 'inactive',
    text: 'Inactive',
  },
};

const CellUserPermission = ({ value }) => (
  <span className="table-users__permission">{USER_PERMISSIONS[value]}</span>
);

const CellUserStatus = ({ value }) => (
  <span className={`table-users__status ${USER_STATUS[value].class}`}>
    {USER_STATUS[value].text}
  </span>
);

const columns = [
  {
    Header: 'First Name',
    accessor: 'profile.first_name', // String-based value accessors!
  },
  {
    Header: 'Last Name',
    accessor: 'profile.last_name',
  },
  {
    Header: 'Email',
    accessor: 'contact.email',
  },
  {
    Header: 'On Air Name',
    accessor: 'station.on_air_name',
  },
  {
    Header: 'Permissions',
    accessor: 'station.permission',
    Cell: row => <CellUserPermission {...row} />,
  },
  {
    Header: 'Status',
    accessor: 'station.status',
    Cell: row => <CellUserStatus {...row} />,
  },
];

class TableUsers extends Component {
  render() {
    const { docs, loading } = this.props.user;

    return (
      <ReactTable
        className="-highlight"
        columns={columns}
        data={docs}
        defaultPageSize={15}
        loading={loading}
        noDataText="No Data Found"
        showPageSizeOptions={false}
      />
    );
  }
}

function mapStateToProps(state) {
  const user = state.user;

  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  null,
)(TableUsers);
