import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Card, { CardBody } from '../../components/Card';
import LargeText from '../../components/LargeText';
import TableAlbumTracks from '../../components/TableAlbumTracks';

import { albumActions } from '../../redux';

class AlbumViewPage extends Component {
  componentDidMount() {
    const { albumState, albumActions, match } = this.props;
    const { _id } = albumState.doc;
    const { id } = match.params;

    if (id !== _id) {
      albumActions.findOne(id);
    }
  }

  renderLastUpdated = () => {
    const { updated_at } = this.props.albumState.doc;
    const dateObj = new Date(updated_at);

    // Checks to see if date is valid or not
    return dateObj instanceof Date && !isNaN(dateObj)
      ? `Last Updated: ${dateObj.toLocaleString()}`
      : '';
  };

  render() {
    const { navigateToTrack, props, renderLastUpdated } = this;
    const { albumState } = props;
    const { artist, name, tracks, label, compilation } = albumState.doc;

    return (
      <div className="album-view-page">
        {!albumState.loading && (
          <>
            <Card>
              <CardBody>
                <div className="album-view-page__header">
                  <div className="album-view-page__song">
                    <h5>Album</h5>
                    <h1 className="album-view-page__song-name">{name}</h1>
                    <h5 className="album-view-page__song-artist">
                      {artist ? (
                        <>
                          by{' '}
                          <a
                            className="album-view-page__artist-link"
                            href={`/library/artist/${artist._id}`}
                          >
                            {artist.name}
                          </a>
                        </>
                      ) : (
                        'No Artist'
                      )}
                    </h5>
                    {!!label && <span>&nbsp;| {label}</span>}
                    {!!compilation && <span>&nbsp;| Compilation</span>}
                  </div>
                  <div className="album-view-page__last-updated">
                    {renderLastUpdated()}
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h2 className="mb-1">Tracks</h2>
                {isEmpty(tracks) ? (
                  <LargeText align="left">No Tracks</LargeText>
                ) : (
                  <TableAlbumTracks onRowClick={navigateToTrack} {...props} />
                )}
              </CardBody>
            </Card>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps({ album }) {
  return {
    albumState: album,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumViewPage);
