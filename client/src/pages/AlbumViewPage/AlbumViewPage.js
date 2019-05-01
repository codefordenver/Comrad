import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Card, { CardBody } from '../../components/Card';
import LargeText from '../../components/LargeText';
import TableAlbumTracks from '../../components/TableAlbumTracks';

import { albumFindOne } from '../../redux/album';
import { Link } from 'react-router-dom';

class AlbumViewPage extends Component {
  componentDidMount() {
    const { album, albumFindOne, match } = this.props;
    const { _id } = album.doc;
    const { id } = match.params;

    if (id !== _id) {
      albumFindOne(id);
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
    const { navigateToTrack, props } = this;
    const { album, loading } = props;
    const { artist, name, tracks, updated_at } = album.doc;
    const dateObj = updated_at == null ? null : new Date(updated_at);
    const lastUpdatedText =
      updated_at == null
        ? ''
        : dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();

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
                <h2 className="mb-1">Tracks</h2>
                {isEmpty(tracks) ? (
                  <LargeText align="left">No Tracks</LargeText>
                ) : (
                  <TableAlbumTracks onRowClick={navigateToTrack} />
                )}
                <Link to="library/track/add">Add Track</Link>
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
  { albumFindOne },
)(AlbumViewPage);
