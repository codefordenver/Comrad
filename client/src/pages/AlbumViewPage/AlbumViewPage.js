import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Card, { CardBody } from '../../components/Card';
import CustomFieldsView from '../../components/CustomFieldsView';
import LargeText from '../../components/LargeText';
import Loading from '../../components/Loading';
import TableAlbumTracks from '../../components/tables/TableAlbumTracks';

import { Link } from 'react-router-dom';
import { libraryActions, configActions } from '../../redux';

class AlbumViewPage extends Component {
  componentDidMount() {
    const {
      albumState,
      libraryActions,
      configActions,
      configState,
      match,
    } = this.props;
    const { _id } = albumState.doc;
    const { id } = match.params;

    if (id !== _id) {
      libraryActions.findOne(id);
    }

    if (!('album' in configState.customFields)) {
      configActions.customFieldsForModel('album');
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

  handleTrackRefresh = () => {
    const { match, libraryActions } = this.props;
    const { id } = match.params;
    libraryActions.findOne(id);
  };

  render() {
    const { navigateToTrack, props, renderLastUpdated } = this;
    const { albumState, configState } = props;
    const { artist, name, tracks, label, compilation, custom } = albumState.doc;
    const { url } = this.props.match;

    let albumCustomFields = [];
    if ('album' in configState.customFields) {
      albumCustomFields = configState.customFields.album;
    }

    return (
      <div className="album-view-page">
        {albumState.loading && <Loading />}
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
                    {custom && (
                      <CustomFieldsView
                        fieldsMeta={albumCustomFields}
                        fieldsValues={custom}
                      />
                    )}
                  </div>
                  <div className="album-view-page__last-updated">
                    {renderLastUpdated()}
                  </div>
                  <Link className="edit-album-button" to={`${url}/edit`}>
                    Edit Album
                  </Link>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h2 className="mb-1">Tracks</h2>
                <Link className="add-track-button" to={`${url}/add`}>
                  Add Track
                </Link>
                {isEmpty(tracks) ? (
                  <LargeText align="left">No Tracks</LargeText>
                ) : (
                  <TableAlbumTracks
                    onRowClick={navigateToTrack}
                    {...props}
                    handleTrackRefresh={this.handleTrackRefresh}
                  />
                )}
              </CardBody>
            </Card>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps({ library, config }) {
  return {
    albumState: library,
    configState: config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
    configActions: bindActionCreators({ ...configActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumViewPage);
