import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormTrackAdd from '../../components/forms/FormTrackAdd';

import { albumActions } from '../../redux';

class TrackAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDiskNumber: 1,
      maxTrackNumber: 1,
    };
  }

  componentWillMount() {
    const { album, albumActions, match } = this.props;
    const { _id } = album.doc;
    const { id } = match.params;

    if (id !== _id) {
      albumActions.findOne(id);
    }
  }

  render() {
    const { name, tracks, _id, artist } = this.props.album.doc;
    const artistId = artist == null ? null : artist._id;
    let maxDiskNumber, maxTrackNumber;
    if (tracks != null && tracks.length) {
      //if there are no existing tracks, default disk and track number is 1
      maxDiskNumber = 1;
      maxTrackNumber = 1;
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
    }
    return (
      <div className="track-add-page">
        <Card>
          <CardBody>
            <h1>Add Track to Album</h1>
            <h2 className="track-add-page__album-name">Album: {name}</h2>
            {_id && (
              <FormTrackAdd
                maxDiskNumber={maxDiskNumber}
                maxTrackNumber={maxTrackNumber}
                submitCallback={this.addTrackCallback}
                albumId={_id}
                artistId={artistId}
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

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackAddPage);
