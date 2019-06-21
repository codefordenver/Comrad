import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormTrackAdd from '../../components/forms/FormTrackAdd';

class TrackAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDiskNumber: 1,
      maxTrackNumber: 1,
    };
  }

  componentWillMount() {
    this.findMaxDiskTrackNumbers();
  }

  findMaxDiskTrackNumbers() {
    const { tracks } = this.props.album.doc;

    let array = [];
    if (tracks.length) {
      //if there are no existing tracks, default disk and track number is 1
      let maxDiskNumber = 1;
      let maxTrackNumber = 1;
      for (var key in tracks) {
        if (tracks[key].disk_number >= maxDiskNumber) {
          if (tracks[key].disk_number > maxDiskNumber) {
            maxDiskNumber = tracks[key].disk_number;
            maxTrackNumber = tracks[key].track_number;
          } else {
            maxTrackNumber = Math.max(maxTrackNumber, tracks[key].track_number);
          }
        }
      }

      this.setState({
        maxDiskNumber: maxDiskNumber,
        maxTrackNumber: maxTrackNumber,
      });
    }
  }

  render() {
    const { name, tracks, _id, artist } = this.props.album.doc;
    return (
      <div className="track-add-page">
        <Card>
          <CardBody>
            <h1>Add Track to Album</h1>
            <h2 className="track-add-page__album-name">Album: {name}</h2>
            {artist && (
              <FormTrackAdd
                maxDiskNumber={this.state.maxDiskNumber}
                maxTrackNumber={this.state.maxTrackNumber}
                submitCallback={this.addTrackCallback}
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

export default connect(mapStateToProps)(TrackAddPage);
