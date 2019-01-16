import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableArtists extends Component {
  render() {
    const { props } = this;
    const { loading, docs } = props;

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
    ];

    return (
      <ReactTable
        className="-highlight"
        columns={columns}
        data={docs}
        defaultPageSize={15}
        loading={loading}
        sowPageSizeOptions={false}
      />
    );
  }
}

export default TableArtists;
