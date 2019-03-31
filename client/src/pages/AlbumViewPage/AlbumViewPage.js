import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import Card, { CardBody } from '../../components/Card';

import { albumFindOne, albumFindTracks } from '../../redux/album';
import { formatTotalSecondsAsMMSS } from '../../utils/formatters';

class AlbumViewPage extends Component {
  componentDidMount() {
    const { album, albumFindOne, albumFindTracks, match } = this.props;
    const { _id } = album.doc;
    const { id } = match.params;

    if (id !== _id) {
      albumFindOne(id);
      albumFindTracks(id);
    }
  }

  navigateToTrack = (state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        //navigate to the view page for this track
        this.props.history.push('/library/track/' + rowInfo.original._id);
      },
    };
  };

  render() {
    const { album, loading, loadingTracks } = this.props;
    const { artist, name, updated_at } = album.doc;
    const dateObj = updated_at == null ? null : new Date(updated_at);
    const lastUpdatedText =
      updated_at == null
        ? ''
        : dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();

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

    return (
      <div className="album-view-page">
        {!loading && (
          <div>
            <Card>
              <CardBody>
                <div className="float-right">
                  Last updated: {lastUpdatedText}
                </div>
                <h1 className="mb-0">{name}</h1>
                {artist != null && (
                  <div>
                    by{' '}
                    <a href={'/library/artist/' + artist._id}>{artist.name}</a>
                  </div>
                )}
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h2>Tracks</h2>
                <div className="album-view-page__track-table">
                  {!loadingTracks && (
                    <ReactTable
                      className="-highlight clickable-rows"
                      columns={columns}
                      data={album.tracks}
                      loading={album.loading}
                      showPageSizeOptions={false}
                      defaultPageSize={100}
                      minRows={3} // so the formatting does not look weird when there are 0 records
                      noDataText="This album does not have any tracks"
                      getTdProps={this.navigateToTrack}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
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
  { albumFindOne, albumFindTracks },
)(AlbumViewPage);
