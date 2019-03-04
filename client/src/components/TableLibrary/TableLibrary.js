import React, { Component } from 'react';
import { connect } from 'react-redux';
import { librarySearch } from '../../redux/library';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {
  CellLibraryTrack,
  CellLibraryType,
  CellLibraryUpdatedAt,
} from './Cells';

export const TALBE_LIBRARY_CELLS = {
  track: data => <CellLibraryTrack {...data} />,
  type: data => <CellLibraryType {...data} />,
  updated_at: data => <CellLibraryUpdatedAt {...data} />,
};

const columns = [
  {
    Header: 'Type',
    accessor: 'type',
    Cell: data => TALBE_LIBRARY_CELLS.type(data),
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: data => {
      console.log(data.row.type);
      return TALBE_LIBRARY_CELLS[data.row.type](data);
    },
  },
  {
    Header: 'Updated At',
    accessor: 'updated_at',
    Cell: data => TALBE_LIBRARY_CELLS.updated_at(data),
  },
];

class TableLibrary extends Component {
  componentDidMount() {
    const { librarySearch } = this.props;
    librarySearch();
  }

  render() {
    const { data } = this.props.library;

    return <ReactTable columns={columns} data={data} />;
  }
}

function mapStateToProps(state) {
  const library = state.library;

  return {
    library,
  };
}

export default connect(
  mapStateToProps,
  { librarySearch },
)(TableLibrary);
