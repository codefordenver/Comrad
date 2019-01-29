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
        accessor: 'email',
      },
      {
        Header: 'On Air Name',
        accessor: 'on_air_name',
      },
      {
        Header: 'Permissions',
        accessor: 'permissions',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: row => (
          <div
            style={{
              color: `${row.value === 'Active' ? '#4BD685' : '#F38173'}`,
            }}
          >
            {row.value}
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
