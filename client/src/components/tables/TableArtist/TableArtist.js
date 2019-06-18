import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableArtist extends Component {
  render() {
    const { loading, docs } = this.props;

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Popularity',
        accessor: 'popularity',
      },
    ];

    return (
      <ReactTable
        className="-highlight"
        columns={columns}
        data={docs}
        defaultPageSize={15}
        loading={loading}
        noDataText="No Data Found"
        sowPageSizeOptions={false}
      />
    );
  }
}

export default TableArtist;
