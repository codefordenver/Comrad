import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import { formatTotalSecondsAsMMSS } from '../../utils/formatters';

const columns = [
  {
    Header: 'Disk #',
    accessor: 'disk_number',
  },
  {
    Header: 'Track #',
    accessor: 'track_number',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Duration',
    accessor: 'duration_in_seconds',
    Cell: row => {
      return row.value == null ? '' : formatTotalSecondsAsMMSS(row.value);
    },
  },
];

class TableAlbumTracks extends Component {
  render() {
    const { album, onRowClick } = this.props;
    const { tracks } = album.doc;

    return (
      <ReactTable
        className="-highlight clickable-rows"
        columns={columns}
        data={tracks}
        showPageSizeOptions={false}
        defaultPageSize={100}
        minRows={3} // so the formatting does not look weird when there are 0 records
        noDataText="This album does not have any tracks"
        getTdProps={onRowClick}
      />
    );
  }
}

function mapStateToProps({ album }) {
  return {
    album,
  };
}

export default connect(
  mapStateToProps,
  null,
)(TableAlbumTracks);
