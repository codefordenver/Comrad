import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableUsers extends Component {
  render() {
    const { docs, loading } = this.props;

    const columns = [
      {
        Header: 'First Name',
        accessor: 'first_name', // String-based value accessors!
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
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
        accessor: 'station.permissions',
      },
      {
        Header: 'Status',
        accessor: 'station.status',
        Cell: row => (
          <div
            style={{
              color: `${row.value ? '#4BD685' : '#F38173'}`,
            }}
          >
            {row.value ? 'Active' : 'Inactive'}
          </div>
        ),
      },
    ];
    return (
      <ReactTable
        className="-highlight"
        columns={columns}
        data={docs}
        defaultPageSize={15}
        loading={loading}
        showPageSizeOptions={false}
      />
    );
  }
}

export default TableUsers;
