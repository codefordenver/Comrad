import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase(0) + value.slice(1);
}

const CellLibraryType = ({ original: { album, artists }, value }) => {
  if (!value) {
    return null;
  }

  function getArtists(artists) {
    let artistNames = artists.filter(artist => artist.name);

    if (artistNames) {
      return (
        <span className="table-library__type-artists">
          by {artistNames.length > 0 ? artistNames.join(', ') : artistNames[0]}
        </span>
      );
    }

    return null;
  }

  function getAlbum(album) {
    if (album) {
      return (
        <span className="table-library__type-album">
          (from the album: {album})
        </span>
      );
    }

    return null;
  }

  return (
    <div className="table-library__type">
      {capitalizeFirstLetter(value)} {getArtists(artists)} {getAlbum(album)}
    </div>
  );
};

const CellLibraryTrack = ({ value }) => {
  return <div className="library-search__track" />;
};

const columns = [
  {
    Header: 'Type',
    accessor: 'tpe',
    Cell: data => <CellLibraryType {...data} />,
  },
];

class TableLibrary extends Component {
  render() {
    return <ReactTable />;
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
  null,
)(TableLibrary);
