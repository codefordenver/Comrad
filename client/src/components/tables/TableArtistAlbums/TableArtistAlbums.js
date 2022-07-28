import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table-6';

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
      return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
    },
  },
];

class TableArtistAlbums extends Component {
  render() {
    const { library, onRowClick } = this.props;
    const { albums } = library.doc;

    return (
      <ReactTable
        className="-highlight clickable-rows"
        columns={columns}
        data={albums}
        showPageSizeOptions={false}
        defaultPageSize={100}
        minRows={3} // so the formatting does not look weird when there are 0 records
        noDataText="This artist does not have any albums"
        getTdProps={onRowClick}
      />
    );
  }
}

function mapStateToProps({ library }) {
  return {
    library,
  };
}

export default connect(
  mapStateToProps,
  null,
)(TableArtistAlbums);
