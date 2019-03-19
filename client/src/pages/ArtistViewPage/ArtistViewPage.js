import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Card, { CardBody } from '../../components/Card';

class ArtistViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: null,
      last_updated: '',
    };

    axios.get('/api/artist/' + this.props.match.params.id).then(response => {
      let dateObj = new Date(response.data.updated_at);
      this.setState({
        artist: response.data,
        last_updated:
          dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString(),
      });
    });
  }

  render() {
    return (
      <div className="artist-view-page">
        {this.state.artist != null && (
          <div>
            <Card>
              <CardBody>
                <div className="float-right">
                  Last updated: {this.state.last_updated}
                </div>
                <h1 className="mb-0">
                  {this.state.artist.name} <button className="edit-button" />
                </h1>
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
)(ArtistViewPage);
