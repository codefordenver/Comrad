import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormTrackEdit from '../../components/forms/FormTrackAdd';

class TrackEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, tracks, _id, artist } = this.props.album.doc;
    return (
      <div className="track-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Track</h1>
            <h2 className="track-edit-page__album-name">Album: {name}</h2>
            {artist && (
              <FormTrackEdit
                submitCallback={this.editTrackCallback}
                albumId={_id}
                artistId={artist._id}
                tracks={tracks}
                history={this.props.history}
              />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ album }) {
  return { album };
}

export default connect(mapStateToProps)(TrackEditPage);
