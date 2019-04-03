import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const CellUserPermission = ({ value }) => (
  <span className="table-users__permission">{value}</span>
);

const CellUserStatus = ({ value }) => {
  const status = value === 'Active';

  return (
    <span className={`table-users__status ${status ? 'active' : 'inactive'}`}>
      {value}
    </span>
  );
};

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
    const { docs } = this.props;

    return (
      <ReactTable
        className="-highlight"
        columns={columns}
        data={docs}
        defaultPageSize={15}
        noDataText="No Data Found"
        showPageSizeOptions={false}
      />
    );
  }
}

export default TableUsers;
