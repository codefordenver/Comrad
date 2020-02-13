import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatTotalSecondsAsMMSS } from '../../utils/formatters';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';

import { libraryActions } from '../../redux';

class TrackViewPage extends Component {
  componentWillMount() {
    const { trackState, libraryActions, match } = this.props;
    const { id } = match.params;

    if (trackState.doc == null || id !== trackState.doc._id) {
      libraryActions.findOne(id);
    }
  }

  render() {
    let artistsHtml = [];
    const { match, trackState, auth } = this.props;
    const { url, params } = match;
    const { id } = params;
    let lastUpdated = '';
    if (trackState.doc != null) {
      for (var i = 0; i < trackState.doc.artists.length; i++) {
        let artist = trackState.doc.artists[i];
        if (artist != null) {
          if (i > 0) {
            artistsHtml.push(<span>, </span>);
          }
          artistsHtml.push(
            <a key={artist._id} href={'/library/artist/' + artist._id}>
              {artist.name}
            </a>,
          );
        }
      }
      let lastUpdatedDateObj = new Date(trackState.doc.updated_at);
      lastUpdated =
        lastUpdatedDateObj.toLocaleDateString() +
        ' ' +
        lastUpdatedDateObj.toLocaleTimeString();
    }

    return (
      <div className="track-view-page">
        {trackState.loading && <Loading />}
        {!trackState.loading &&
          trackState.doc != null &&
          trackState.doc._id === id && (
            <div>
              <Card>
                <CardBody>
                  <div className="float-right">Last updated: {lastUpdated}</div>
                  {(auth.doc.roles.indexOf('Admin') !== -1 ||
                    auth.doc.roles.indexOf('Full Access') !== -1 ||
                    auth.doc.roles.indexOf('Music Library Admin') !== -1) && (
                    <Link
                      className="track-edit-button-wrapper"
                      to={`${url}/edit`}
                    >
                      <div className="track-edit-button">
                        Edit <i className="fas fa-edit" />
                      </div>
                    </Link>
                  )}
                  <h1 className="mb-0">{trackState.doc.name}</h1>
                  <div>
                    {' '}
                    by <span>{artistsHtml}</span>
                  </div>
                  <div>
                    Track duration:{' '}
                    {formatTotalSecondsAsMMSS(
                      trackState.doc.duration_in_seconds,
                    )}
                  </div>
                  <div>
                    from the album{' '}
                    <a href={'/library/album/' + trackState.doc.album._id}>
                      {trackState.doc.album.name}
                    </a>
                  </div>
                  <div>Disk number: {trackState.doc.disk_number}</div>
                  <div>Track number: {trackState.doc.track_number}</div>
                </CardBody>
              </Card>
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    trackState: state.library,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackViewPage);
