import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class TableAlbums extends Component {
  render() {
    const { albums, loading, onRowClick } = this.props;

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Number of Tracks',
        accessor: 'number_of_tracks',
      },
      {
        Header: 'Label',
        accessor: 'label',
      },
      {
        Header: 'Updated At',
        accessor: 'updated_at',
        Cell: row => {
          let dateObj = new Date(row.value);
          return (
            dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
          );
        },
      },
    ];

    return (
      <ReactTable
        className="-highlight clickable-rows"
        columns={columns}
        data={albums}
        loading={loading}
        showPageSizeOptions={false}
        defaultPageSize={100}
        minRows={3} // so the formatting does not look weird when there are 0 records
        noDataText="This artist does not have any albums"
        getTdProps={onRowClick}
      />
    );
  }
}
