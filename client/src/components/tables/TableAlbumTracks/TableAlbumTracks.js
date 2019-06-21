import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import isEmpty from 'lodash/isEmpty';

import { formatTotalSecondsAsMMSS } from '../../../utils/formatters';

const CellDuration = ({ value }) =>
  value ? (
    <span className="table-album-tracks__duration">
      {formatTotalSecondsAsMMSS(value)}
    </span>
  ) : null;

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
    Cell: row => <CellDuration {...row} />,
  },
];

class TableAlbumTracks extends Component {
  handleRowClick = (state, rowInfo) => {
    if (!isEmpty(rowInfo)) {
      return {
        onClick: () => {
          const { _id } = rowInfo.original;
          const { history } = this.props;

          history.push(`/library/track/${_id}`);
        },
      };
    }

    return false;
  };

  render() {
    const { handleRowClick, props } = this;
    const { albumState } = props;
    const { tracks } = albumState.doc;

    return (
      <ReactTable
        className="-highlight clickable-rows"
        columns={columns}
        data={tracks}
        showPageSizeOptions={false}
        defaultPageSize={100}
        minRows={3} // so the formatting does not look weird when there are 0 records
        noDataText="This album does not have any tracks"
        getTdProps={handleRowClick}
      />
    );
  }
}

function mapStateToProps({ album }) {
  return {
    albumState: album,
  };
}

export default connect(
  mapStateToProps,
  null,
)(TableAlbumTracks);
