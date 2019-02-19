import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Card, { CardBody } from '../../components/Card';

class AlbumViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: null,
      last_updated: '',
    };

    axios.get('/api/album/' + this.props.match.params.id).then(response => {
      let dateObj = new Date(response.data.updated_at);
      this.setState({
        album: response.data,
        last_updated:
          dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString(),
      });
    });
  }

  render() {
    return (
      <div className="album-view-page">
        {this.state.album != null && (
          <div>
            <Card>
              <CardBody>
                <div className="float-right">
                  Last updated: {this.state.last_updated}
                </div>
                <h1 className="mb-0">{this.state.album.name}</h1>
                <div>
                  by{' '}
                  <a href={'/library/artist/' + this.state.album.artist._id}>
                    {this.state.album.artist.name}
                  </a>
                </div>
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
)(AlbumViewPage);
