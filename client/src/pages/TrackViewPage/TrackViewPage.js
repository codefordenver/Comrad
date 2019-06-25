import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatTotalSecondsAsMMSS } from '../../utils/formatters';

import Card, { CardBody } from '../../components/Card';

class TrackViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: null,
      last_updated: '',
    };

    axios.get('/v1/tracks/' + this.props.match.params.id).then(response => {
      let dateObj = new Date(response.data.updated_at);
      this.setState({
        track: response.data,
        last_updated:
          dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString(),
      });
    });
  }

  render() {
    let artistsHtml = [];
    if (this.state.track != null) {
      for (var i = 0; i < this.state.track.artists.length; i++) {
        let artist = this.state.track.artists[i];
        if (i > 0) {
          artistsHtml.push(<span>, </span>);
        }
        artistsHtml.push(
          <a href={'/library/artist/' + artist._id}>{artist.name}</a>,
        );
      }
    }

    return (
      <div className="track-view-page">
        {this.state.track != null && (
          <div>
            <Card>
              <CardBody>
                <div className="float-right">
                  Last updated: {this.state.last_updated}
                </div>
                <Link className="track-edit-button-wrapper" to="/">
                  <div className="track-edit-button">
                    Edit <i className="fas fa-edit" />
                  </div>
                </Link>
                <h1 className="mb-0">{this.state.track.name}</h1>
                <div>
                  {' '}
                  by <span>{artistsHtml}</span>
                </div>
                <div>
                  Track duration:{' '}
                  {formatTotalSecondsAsMMSS(
                    this.state.track.duration_in_seconds,
                  )}
                </div>
                <div>
                  from the album{' '}
                  <a href={'/library/album/' + this.state.track.album._id}>
                    {this.state.track.album.name}
                  </a>
                </div>
                <div>Disk number: {this.state.track.disk_number}</div>
                <div>Track number: {this.state.track.track_number}</div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { error } = state.library;
  return {
    error,
  };
}

export default connect(
  mapStateToProps,
  {},
)(TrackViewPage);
