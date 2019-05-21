import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormTrackAdd from '../../components/FormTrackAdd';

class TrackAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDiskNumber: 0,
      maxTrackNumber: 0,
    };
  }

  addTrackCallback = id => {
    this.props.history.push('/library/albums/:id/tracks' + id);
  };

  componentWillMount() {
    this.findMaxDiskTrackNumbers();
  }

  findMaxDiskTrackNumbers() {
    const { tracks } = this.props.album.doc;
    let array = [];
    for (var key in tracks) {
      array.push(tracks[key].disk_number);
    }
    var maxDiskNumber = array.reduce(function(a, b) {
      return Math.max(a, b);
    });

    array = [];
    for (var key in tracks) {
      if (tracks[key].disk_number === maxDiskNumber) {
        array.push(tracks[key].track_number);
      }
    }
    var maxTrackNumber = array.reduce(function(a, b) {
      return Math.max(a, b);
    });
    this.setState({
      maxDiskNumber: maxDiskNumber,
      maxTrackNumber: maxTrackNumber,
    });
  }

  render() {
    const { name, tracks, _id, artist } = this.props.album.doc;
    return (
      <div>
        <Card>
          <CardBody>
            <h1>Add Track to Album</h1>
            <h2 className="album-name">Album: {name}</h2>
            <FormTrackAdd
              maxDiskNumber={this.state.maxDiskNumber}
              maxTrackNumber={this.state.maxTrackNumber}
              submitCallback={this.addTrackCallback}
              albumId={_id}
              artistId={artist._id}
            />
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
